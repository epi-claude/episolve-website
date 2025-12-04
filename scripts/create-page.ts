/**
 * Create a simple page
 * Usage: DATABASE_URI="..." pnpm tsx scripts/create-page.ts <title> <slug>
 * Example: pnpm tsx scripts/create-page.ts "About Us" about
 */

import { getPayload } from 'payload'
import config from '@payload-config'

async function createPage() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.error('Usage: pnpm tsx scripts/create-page.ts <title> <slug> [--published]')
    console.error('Example: pnpm tsx scripts/create-page.ts "About Us" about --published')
    process.exit(1)
  }

  const title = args[0]
  const slug = args[1]
  const published = args.includes('--published')

  const payload = await getPayload({ config })

  try {
    console.log(`📄 Creating page: ${title} (/${slug})...`)

    const page = await payload.create({
      collection: 'pages',
      data: {
        title,
        slug,
        hero: {
          type: 'lowImpact',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h1',
                  children: [
                    {
                      type: 'text',
                      text: title,
                    },
                  ],
                },
              ],
            },
          },
        },
        layout: [
          {
            blockType: 'content',
            blockName: 'Main Content',
            columns: [
              {
                size: 'full',
                richText: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: `This is the ${title} page. Add your content here via the Payload admin or by updating this script.`,
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
        meta: {
          title: `${title} | Episolve LLC`,
          description: `Learn more about ${title.toLowerCase()} at Episolve LLC.`,
        },
        publishedAt: published ? new Date().toISOString() : undefined,
        _status: published ? 'published' : 'draft',
      },
    })

    console.log(`✅ Page created successfully!`)
    console.log(`   Title: ${page.title}`)
    console.log(`   Slug: ${page.slug}`)
    console.log(`   URL: /${page.slug}`)
    console.log(`   Status: ${page._status}`)
    console.log(`   ID: ${page.id}`)

    if (!published) {
      console.log('\n💡 Tip: Add --published flag to publish immediately')
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating page:', error)
    process.exit(1)
  }
}

createPage()
