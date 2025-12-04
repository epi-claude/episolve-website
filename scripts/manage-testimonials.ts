/**
 * Manage testimonials - Create, update, or delete
 * Usage: DATABASE_URI="..." pnpm tsx scripts/manage-testimonials.ts <action> [options]
 *
 * Actions:
 *   create - Create a new testimonial
 *   update - Update existing testimonial
 *   delete - Delete a testimonial
 *   list - List all testimonials
 *
 * Examples:
 *   Create: pnpm tsx scripts/manage-testimonials.ts create --quote "Great service!" --name "John Doe" --company "Acme Corp"
 *   Update: pnpm tsx scripts/manage-testimonials.ts update <id> --featured true
 *   Delete: pnpm tsx scripts/manage-testimonials.ts delete <id>
 *   List: pnpm tsx scripts/manage-testimonials.ts list
 */

import { getPayload } from 'payload'
import config from '@payload-config'

async function manageTestimonials() {
  const args = process.argv.slice(2)

  if (args.length < 1) {
    console.error('Usage: pnpm tsx scripts/manage-testimonials.ts <action> [options]')
    console.error('Actions: create, update, delete, list')
    process.exit(1)
  }

  const action = args[0]
  const payload = await getPayload({ config })

  try {
    switch (action) {
      case 'create':
        await createTestimonial(payload, args.slice(1))
        break
      case 'update':
        await updateTestimonial(payload, args.slice(1))
        break
      case 'delete':
        await deleteTestimonial(payload, args.slice(1))
        break
      case 'list':
        await listTestimonials(payload)
        break
      default:
        console.error(`Unknown action: ${action}`)
        process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

async function createTestimonial(payload: any, args: string[]) {
  const data: any = {
    featured: false,
    order: 0,
    publishedAt: new Date().toISOString(),
  }

  for (let i = 0; i < args.length; i += 2) {
    const field = args[i].replace('--', '')
    const value = args[i + 1]

    switch (field) {
      case 'quote':
        data.quote = value
        break
      case 'name':
        data.clientName = value
        break
      case 'role':
        data.clientRole = value
        break
      case 'company':
        data.clientCompany = value
        break
      case 'featured':
        data.featured = value === 'true'
        break
      case 'order':
        data.order = parseInt(value)
        break
    }
  }

  if (!data.quote || !data.clientName) {
    console.error('❌ Required fields: --quote and --name')
    process.exit(1)
  }

  const testimonial = await payload.create({
    collection: 'testimonials',
    data,
  })

  console.log('✅ Testimonial created!')
  console.log(`   ID: ${testimonial.id}`)
  console.log(`   Client: ${testimonial.clientName}`)
  console.log(`   Quote: ${testimonial.quote}`)
  console.log(`   Featured: ${testimonial.featured}`)
}

async function updateTestimonial(payload: any, args: string[]) {
  if (args.length < 1) {
    console.error('Usage: update <id> [--field value]')
    process.exit(1)
  }

  const id = args[0]
  const updates: any = {}

  for (let i = 1; i < args.length; i += 2) {
    const field = args[i].replace('--', '')
    const value = args[i + 1]

    switch (field) {
      case 'quote':
        updates.quote = value
        break
      case 'featured':
        updates.featured = value === 'true'
        break
      case 'order':
        updates.order = parseInt(value)
        break
    }
  }

  const testimonial = await payload.update({
    collection: 'testimonials',
    id,
    data: updates,
  })

  console.log('✅ Testimonial updated!')
  console.log(`   ID: ${testimonial.id}`)
  console.log(`   Client: ${testimonial.clientName}`)
  console.log(`   Featured: ${testimonial.featured}`)
}

async function deleteTestimonial(payload: any, args: string[]) {
  if (args.length < 1) {
    console.error('Usage: delete <id>')
    process.exit(1)
  }

  const id = args[0]
  await payload.delete({
    collection: 'testimonials',
    id,
  })

  console.log(`✅ Testimonial ${id} deleted!`)
}

async function listTestimonials(payload: any) {
  const result = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: 'order',
  })

  console.log(`\n📋 Found ${result.totalDocs} testimonials:\n`)

  result.docs.forEach((testimonial: any) => {
    console.log(`ID: ${testimonial.id}`)
    console.log(`Client: ${testimonial.clientName} ${testimonial.clientCompany ? `(${testimonial.clientCompany})` : ''}`)
    console.log(`Quote: ${testimonial.quote.substring(0, 80)}${testimonial.quote.length > 80 ? '...' : ''}`)
    console.log(`Featured: ${testimonial.featured ? '⭐' : '✗'}`)
    console.log(`Order: ${testimonial.order}`)
    console.log('---')
  })
}

manageTestimonials()
