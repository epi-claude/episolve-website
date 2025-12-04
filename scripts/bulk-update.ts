/**
 * Bulk update multiple items
 * Usage: DATABASE_URI="..." pnpm tsx scripts/bulk-update.ts <collection> <query> <updates>
 *
 * Examples:
 *   Make all services featured: pnpm tsx scripts/bulk-update.ts services all --featured true
 *   Reorder services: pnpm tsx scripts/bulk-update.ts services "IT Consulting,Cloud Solutions" --order "1,2"
 *   Update team order: pnpm tsx scripts/bulk-update.ts team-members all --order-by name
 */

import { getPayload } from 'payload'
import config from '@payload-config'

async function bulkUpdate() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.error('Usage: pnpm tsx scripts/bulk-update.ts <collection> <selector> [--field value]')
    console.error('\nCollections: services, team-members, testimonials')
    console.error('Selectors: all, "slug1,slug2,slug3", or id:123')
    console.error('\nExamples:')
    console.error('  pnpm tsx scripts/bulk-update.ts services all --featured false')
    console.error('  pnpm tsx scripts/bulk-update.ts team-members all --order-increment 1')
    process.exit(1)
  }

  const collection = args[0]
  const selector = args[1]
  const payload = await getPayload({ config })

  try {
    // Validate collection
    const validCollections = ['services', 'team-members', 'testimonials']
    if (!validCollections.includes(collection)) {
      console.error(`❌ Invalid collection. Use: ${validCollections.join(', ')}`)
      process.exit(1)
    }

    // Parse updates
    const updates: any = {}
    let orderIncrement = 0

    for (let i = 2; i < args.length; i += 2) {
      const field = args[i].replace('--', '')
      const value = args[i + 1]

      switch (field) {
        case 'featured':
          updates.featured = value === 'true'
          break
        case 'order':
          updates.order = parseInt(value)
          break
        case 'order-increment':
          orderIncrement = parseInt(value)
          break
        default:
          updates[field] = value
      }
    }

    // Get items to update
    let items: any[]

    if (selector === 'all') {
      const result = await payload.find({
        collection: collection as any,
        limit: 1000,
      })
      items = result.docs
    } else if (selector.startsWith('id:')) {
      const id = selector.replace('id:', '')
      const item = await payload.findByID({
        collection: collection as any,
        id,
      })
      items = [item]
    } else {
      // Comma-separated slugs or names
      const selectors = selector.split(',').map((s) => s.trim())
      const result = await payload.find({
        collection: collection as any,
        where: {
          or: selectors.map((s) => ({
            slug: { equals: s },
          })),
        },
        limit: 1000,
      })
      items = result.docs
    }

    if (items.length === 0) {
      console.log('⚠️  No items found matching selector')
      process.exit(0)
    }

    console.log(`📝 Updating ${items.length} items in ${collection}...`)

    // Update each item
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemUpdates = { ...updates }

      // Apply order increment if specified
      if (orderIncrement !== 0) {
        itemUpdates.order = (item.order || 0) + orderIncrement
      }

      await payload.update({
        collection: collection as any,
        id: item.id,
        context: {
          disableRevalidate: true,
        },
        data: itemUpdates,
      })

      const name = item.title || item.name || item.clientName || `Item ${item.id}`
      console.log(`  ✓ Updated: ${name}`)
    }

    console.log(`\n✅ Successfully updated ${items.length} items!`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

bulkUpdate()
