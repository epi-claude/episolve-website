import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, source = 'footer' } = body

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          errors: {
            email: 'Please enter a valid email address',
          },
        },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    // Check if already subscribed
    const existing = await payload.find({
      collection: 'subscribers',
      where: {
        email: {
          equals: email.trim().toLowerCase(),
        },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      return NextResponse.json({
        success: true,
        message: "You're already subscribed!",
      })
    }

    // Create subscriber
    await payload.create({
      collection: 'subscribers',
      data: {
        email: email.trim().toLowerCase(),
        source,
        status: 'active',
      },
    })

    // Send welcome email (if Resend is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Episolve Insights <newsletter@episolve.com>',
            to: email,
            subject: 'Welcome to Episolve Insights',
            html: `
              <h2>Thanks for subscribing!</h2>
              <p>You're now subscribed to Episolve Insights. We'll send you valuable content about technology, business solutions, and industry trends.</p>
              <p>Stay tuned for our next update!</p>
              <hr />
              <p><small>Episolve LLC | Technology Solutions for Business Problems</small></p>
              <p><small><a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a></small></p>
            `,
          }),
        })
      } catch (error) {
        console.error('Failed to send welcome email:', error)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "You're subscribed! Check your email for confirmation.",
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again later.',
      },
      { status: 500 },
    )
  }
}
