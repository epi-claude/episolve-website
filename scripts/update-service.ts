/**
 * Update an existing service
 * Usage: DATABASE_URI="..." pnpm tsx scripts/update-service.ts <slug> [field] [value]
 * Examples:
 *   - Update entire service: pnpm tsx scripts/update-service.ts it-consulting --title "IT Consulting & Strategy"
 *   - Update description: pnpm tsx scripts/update-service.ts it-consulting --short "New description"
 *   - Toggle featured: pnpm tsx scripts/update-service.ts it-consulting --featured true
 */

import { getPayload } from 'payload'
import config from '@payload-config'

async function updateService() {
  const args = process.argv.slice(2)

  if (args.length < 1) {
    console.error('Usage: pnpm tsx scripts/update-service.ts <slug> [--field value]')
    console.error('Example: pnpm tsx scripts/update-service.ts it-consulting --title "New Title"')
    process.exit(1)
  }

  const slug = args[0]
  const payload = await getPayload({ config })

  try {
    // Find the service
    const result = await payload.find({
      collection: 'services',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (!result.docs || result.docs.length === 0) {
      console.error(`❌ Service not found: ${slug}`)
      process.exit(1)
    }

    const service = result.docs[0]
    console.log(`Found service: ${service.title} (ID: ${service.id})`)

    // Parse updates from arguments
    const updates: any = {}
    for (let i = 1; i < args.length; i += 2) {
      const field = args[i].replace('--', '')
      const value = args[i + 1]

      switch (field) {
        case 'title':
          updates.title = value
          break
        case 'short':
        case 'shortDescription':
          updates.shortDescription = value
          break
        case 'icon':
          updates.icon = value
          break
        case 'featured':
          updates.featured = value === 'true'
          break
        case 'order':
          updates.order = parseInt(value)
          break
        case 'cta-text':
          updates.cta = { ...service.cta, text: value }
          break
        case 'cta-link':
          updates.cta = { ...service.cta, link: value }
          break
        default:
          console.warn(`Unknown field: ${field}`)
      }
    }

    if (Object.keys(updates).length === 0) {
      console.log('No updates specified. Available fields:')
      console.log('  --title "Service Title"')
      console.log('  --short "Short description"')
      console.log('  --icon "lightbulb|code|chart|shield|cloud|database|settings|users"')
      console.log('  --featured true|false')
      console.log('  --order 1')
      console.log('  --cta-text "Button text"')
      console.log('  --cta-link "/contact"')
      process.exit(0)
    }

    // Update the service
    const updated = await payload.update({
      collection: 'services',
      id: service.id,
      context: {
        disableRevalidate: true,
      },
      data: updates,
    })

    console.log('\n✅ Service updated successfully!')
    console.log(`Title: ${updated.title}`)
    console.log(`Slug: ${updated.slug}`)
    if (updates.shortDescription) console.log(`Description: ${updated.shortDescription}`)
    if (updates.featured !== undefined) console.log(`Featured: ${updated.featured}`)
    if (updates.order !== undefined) console.log(`Order: ${updated.order}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating service:', error)
    process.exit(1)
  }
}

updateService()
