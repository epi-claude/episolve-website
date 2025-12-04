import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, service, message } = body

    // Validation
    const errors: Record<string, string> = {}

    if (!name || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (phone && !/^[\d\s\-\(\)\+]+$/.test(phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    if (!message || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
        },
        { status: 400 },
      )
    }

    // Create lead in Payload
    const payload = await getPayload({ config })

    const lead = await payload.create({
      collection: 'leads',
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || '',
        company: company?.trim() || '',
        service: service || null,
        message: message.trim(),
        source: 'contact_form',
        status: 'new',
      },
    })

    // Send confirmation email to user (if Resend is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Episolve <noreply@episolve.com>',
            to: email,
            subject: 'Thank you for contacting Episolve',
            html: `
              <h2>Thanks for reaching out!</h2>
              <p>Hi ${name},</p>
              <p>We've received your message and will get back to you shortly.</p>
              <p><strong>Your message:</strong></p>
              <p>${message}</p>
              <hr />
              <p><small>Episolve LLC | Technology Solutions for Business Problems</small></p>
            `,
          }),
        })
      } catch (error) {
        console.error('Failed to send confirmation email:', error)
        // Don't fail the request if email fails
      }
    }

    // Send notification email to team (if Resend is configured)
    if (process.env.RESEND_API_KEY && process.env.TEAM_EMAIL) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Episolve Notifications <notifications@episolve.com>',
            to: process.env.TEAM_EMAIL,
            subject: `New Lead: ${name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
              ${service ? `<p><strong>Service Interest:</strong> ${service}</p>` : ''}
              <p><strong>Message:</strong></p>
              <p>${message}</p>
              <hr />
              <p><a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}/admin/collections/leads/${lead.id}">View in Admin</a></p>
            `,
          }),
        })
      } catch (error) {
        console.error('Failed to send team notification:', error)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll be in touch soon!",
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again later.',
      },
      { status: 500 },
    )
  }
}
