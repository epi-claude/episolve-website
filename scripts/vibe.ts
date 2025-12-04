#!/usr/bin/env tsx
/**
 * Vibe Coding Interface - Natural language content management
 * Usage: pnpm vibe
 *
 * This script provides an interactive prompt where you can describe what you want
 * in natural language, and it will execute the appropriate scripts.
 *
 * Examples:
 *   "Create a service about cloud security"
 *   "Add a team member named Sarah as VP of Engineering"
 *   "Generate a blog post about AI trends in 2025"
 *   "Make all services featured except IT consulting"
 *   "Show me all testimonials"
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

async function vibe() {
  console.log('\n🎨 Vibe Coding Interface')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Describe what you want in plain English.')
  console.log('Type "exit" to quit, "help" for examples.\n')

  const payload = await getPayload({ config })

  while (true) {
    const input = await prompt('✨ What would you like to do? ')

    if (!input.trim()) continue

    const command = input.toLowerCase().trim()

    if (command === 'exit' || command === 'quit') {
      console.log('\n👋 See you later!\n')
      rl.close()
      process.exit(0)
    }

    if (command === 'help' || command === '?') {
      showHelp()
      continue
    }

    try {
      await processCommand(payload, input)
    } catch (error) {
      console.error('\n❌ Error:', error)
      console.log('💡 Try rephrasing your request or type "help" for examples.\n')
    }
  }
}

function showHelp() {
  console.log('\n📚 Example Commands:\n')
  console.log('Content Creation:')
  console.log('  "Create a service about cloud security"')
  console.log('  "Add a team member named Sarah as VP of Engineering"')
  console.log('  "Generate a blog post about AI in healthcare"')
  console.log('  "Create a testimonial from John at Acme Corp"\n')
  console.log('Content Management:')
  console.log('  "List all services"')
  console.log('  "Show me testimonials"')
  console.log('  "Update the IT consulting service to be featured"')
  console.log('  "Make all services not featured except cloud solutions"\n')
  console.log('Content Generation:')
  console.log('  "Generate content for a DevOps service with keywords automation, CI/CD"')
  console.log('  "Create a bio for Jane Doe as CTO with 15 years experience"\n')
  console.log('Navigation:')
  console.log('  "help" - Show this help')
  console.log('  "exit" - Quit\n')
}

async function processCommand(payload: any, input: string) {
  const lower = input.toLowerCase()

  // List commands
  if (lower.includes('list') || lower.includes('show me')) {
    if (lower.includes('service')) {
      await listServices(payload)
    } else if (lower.includes('team') || lower.includes('member')) {
      await listTeamMembers(payload)
    } else if (lower.includes('testimonial')) {
      await listTestimonials(payload)
    } else if (lower.includes('post') || lower.includes('blog')) {
      await listPosts(payload)
    } else {
      console.log('\n💡 What would you like to list? (services, team members, testimonials, posts)\n')
    }
    return
  }

  // Create service
  if (lower.includes('create') && lower.includes('service')) {
    await createServiceInteractive(payload, input)
    return
  }

  // Create team member
  if (lower.includes('add') && (lower.includes('team') || lower.includes('member'))) {
    await createTeamMemberInteractive(payload, input)
    return
  }

  // Create blog post
  if (lower.includes('create') && (lower.includes('blog') || lower.includes('post'))) {
    await createBlogInteractive(payload, input)
    return
  }

  // Create testimonial
  if (lower.includes('create') && lower.includes('testimonial')) {
    await createTestimonialInteractive(payload, input)
    return
  }

  // Update commands
  if (lower.includes('update') || lower.includes('make')) {
    console.log('\n🔄 Update functionality - coming soon!')
    console.log('For now, use: pnpm tsx scripts/update-service.ts <slug> --field value\n')
    return
  }

  // Fallback
  console.log('\n❓ I\'m not sure what you mean. Try:')
  console.log('  • "list services"')
  console.log('  • "create a service about [topic]"')
  console.log('  • "add a team member named [name]"')
  console.log('  • Type "help" for more examples\n')
}

// ============================================================================
// List Commands
// ============================================================================

async function listServices(payload: any) {
  const result = await payload.find({
    collection: 'services',
    limit: 100,
    sort: 'order',
  })

  console.log(`\n📋 Found ${result.totalDocs} services:\n`)
  result.docs.forEach((service: any) => {
    console.log(`${service.featured ? '⭐' : '  '} ${service.title}`)
    console.log(`   Slug: ${service.slug}`)
    console.log(`   Order: ${service.order}`)
    console.log(`   Status: ${service._status}`)
    console.log('')
  })
}

async function listTeamMembers(payload: any) {
  const result = await payload.find({
    collection: 'team-members',
    limit: 100,
    sort: 'order',
  })

  console.log(`\n👥 Found ${result.totalDocs} team members:\n`)
  result.docs.forEach((member: any) => {
    console.log(`${member.name} - ${member.role}`)
    console.log(`   Order: ${member.order}`)
    if (member.email) console.log(`   Email: ${member.email}`)
    console.log('')
  })
}

async function listTestimonials(payload: any) {
  const result = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: 'order',
  })

  console.log(`\n💬 Found ${result.totalDocs} testimonials:\n`)
  result.docs.forEach((testimonial: any) => {
    console.log(
      `${testimonial.featured ? '⭐' : '  '} ${testimonial.clientName} (${testimonial.clientCompany})`,
    )
    console.log(`   "${testimonial.quote.substring(0, 80)}..."`)
    console.log('')
  })
}

async function listPosts(payload: any) {
  const result = await payload.find({
    collection: 'posts',
    limit: 100,
    sort: '-publishedAt',
  })

  console.log(`\n📝 Found ${result.totalDocs} posts:\n`)
  result.docs.forEach((post: any) => {
    console.log(`${post.title}`)
    console.log(`   Slug: ${post.slug}`)
    console.log(`   Status: ${post._status}`)
    console.log('')
  })
}

// ============================================================================
// Create Commands
// ============================================================================

async function createServiceInteractive(payload: any, input: string) {
  console.log('\n🔧 Creating a new service...\n')

  // Try to extract title from input
  const aboutMatch = input.match(/about (.+?)(?:\.|$)/i)
  const calledMatch = input.match(/called ["'](.+?)["']/i)
  const namedMatch = input.match(/named ["'](.+?)["']/i)

  const suggestedTitle =
    aboutMatch?.[1] || calledMatch?.[1] || namedMatch?.[1] || 'New Service'

  const title = await prompt(`Service title [${suggestedTitle}]: `)
  const finalTitle = title.trim() || suggestedTitle

  const keywords = await prompt('Keywords (comma-separated) [optional]: ')
  const icon = await prompt(
    'Icon (lightbulb/code/chart/shield/cloud/database/settings/users) [lightbulb]: ',
  )
  const featured = await prompt('Featured on homepage? (y/n) [n]: ')
  const publish = await prompt('Publish immediately? (y/n) [y]: ')

  console.log('\n🤖 Generating content...')

  const slug = finalTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  // Generate content (simplified - in real version would use AI)
  const shortDescription = `Expert ${finalTitle.toLowerCase()} services tailored to your business needs and objectives.`
  const fullDescription = `Our ${finalTitle} service delivers exceptional results through proven methodologies and industry expertise. We work collaboratively with your team to implement solutions that drive sustainable success.`
  const features = [
    'Strategic planning and implementation',
    'Expert consultation and guidance',
    'Ongoing support and optimization',
  ]

  if (keywords.trim()) {
    features.unshift(
      ...keywords
        .split(',')
        .slice(0, 2)
        .map((k) => `${k.trim()} expertise and best practices`),
    )
  }

  const service = await payload.create({
    collection: 'services',
    context: {
      disableRevalidate: true,
    },
    data: {
      title: finalTitle,
      slug,
      icon: icon.trim() || 'lightbulb',
      shortDescription,
      fullDescription: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: fullDescription,
                },
              ],
            },
          ],
        },
      },
      features: features.map((f) => ({ feature: f })),
      featured: featured.toLowerCase() === 'y',
      order: 0,
      cta: {
        text: 'Request this Service',
        link: '/contact',
      },
      meta: {
        title: `${finalTitle} | Episolve LLC`,
        description: shortDescription,
      },
      _status: publish.toLowerCase() === 'n' ? 'draft' : 'published',
    },
  })

  console.log('\n✅ Service created!')
  console.log(`   Title: ${service.title}`)
  console.log(`   Slug: ${service.slug}`)
  console.log(`   URL: /services/${service.slug}`)
  console.log(`   Status: ${service._status}\n`)
}

async function createTeamMemberInteractive(payload: any, input: string) {
  console.log('\n👤 Adding a new team member...\n')

  const namedMatch = input.match(/named (.+?)(?:as|$)/i)
  const asMatch = input.match(/as (.+?)(?:\.|$)/i)

  const suggestedName = namedMatch?.[1]?.trim() || 'New Member'
  const suggestedRole = asMatch?.[1]?.trim() || ''

  const name = await prompt(`Name [${suggestedName}]: `)
  const finalName = name.trim() || suggestedName

  const role = await prompt(`Role [${suggestedRole || 'Team Member'}]: `)
  const finalRole = role.trim() || suggestedRole || 'Team Member'

  const email = await prompt('Email [optional]: ')
  const linkedIn = await prompt('LinkedIn URL [optional]: ')

  console.log('\n🤖 Generating bio...')

  const bio = `${finalName} serves as ${finalRole} at Episolve, bringing extensive experience in technology leadership and strategic innovation. Known for building high-performing teams and fostering cultures of innovation, ${finalName.split(' ')[0]} is passionate about leveraging technology to create competitive advantage.`

  const member = await payload.create({
    collection: 'team-members',
    context: {
      disableRevalidate: true,
    },
    data: {
      name: finalName,
      role: finalRole,
      bio: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: bio,
                },
              ],
            },
          ],
        },
      },
      email: email.trim(),
      linkedIn: linkedIn.trim(),
      order: 0,
    },
  })

  console.log('\n✅ Team member added!')
  console.log(`   Name: ${member.name}`)
  console.log(`   Role: ${member.role}\n`)
}

async function createBlogInteractive(payload: any, input: string) {
  console.log('\n📝 Creating a new blog post...\n')

  const aboutMatch = input.match(/about (.+?)(?:\.|$)/i)
  const suggestedTitle = aboutMatch?.[1] || 'New Blog Post'

  const title = await prompt(`Post title [${suggestedTitle}]: `)
  const finalTitle = title.trim() || suggestedTitle

  const category = await prompt('Category [Technology]: ')
  const publish = await prompt('Publish immediately? (y/n) [y]: ')

  console.log('\n🤖 Generating content...')

  const slug = finalTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const content = `# ${finalTitle}

In today's rapidly evolving business landscape, understanding ${finalTitle.toLowerCase()} is essential for maintaining competitive advantage.

## Key Insights

This comprehensive guide explores the latest trends, best practices, and practical strategies that forward-thinking organizations are using to drive innovation and business value.

## Moving Forward

Ready to learn more? [Contact us](/contact) to discuss how we can help your organization succeed.`

  const post = await payload.create({
    collection: 'posts',
    context: {
      disableRevalidate: true,
    },
    data: {
      title: finalTitle,
      slug,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: content,
                },
              ],
            },
          ],
        },
      },
      meta: {
        title: `${finalTitle} | Episolve Insights`,
        description: `Learn about ${finalTitle.toLowerCase()} and how it can benefit your organization.`,
      },
      publishedAt: publish.toLowerCase() === 'n' ? undefined : new Date().toISOString(),
      _status: publish.toLowerCase() === 'n' ? 'draft' : 'published',
    },
  })

  console.log('\n✅ Blog post created!')
  console.log(`   Title: ${post.title}`)
  console.log(`   Slug: ${post.slug}`)
  console.log(`   URL: /posts/${post.slug}`)
  console.log(`   Status: ${post._status}\n`)
}

async function createTestimonialInteractive(payload: any, input: string) {
  console.log('\n💬 Creating a new testimonial...\n')

  const fromMatch = input.match(/from (.+?)(?:at|$)/i)
  const atMatch = input.match(/at (.+?)(?:\.|$)/i)

  const name = await prompt(`Client name [${fromMatch?.[1]?.trim() || ''}]: `)
  const company = await prompt(`Company [${atMatch?.[1]?.trim() || ''}]: `)
  const role = await prompt('Role [optional]: ')
  const quote = await prompt('Quote: ')

  const testimonial = await payload.create({
    collection: 'testimonials',
    context: {
      disableRevalidate: true,
    },
    data: {
      quote: quote.trim(),
      clientName: name.trim(),
      clientRole: role.trim(),
      clientCompany: company.trim(),
      featured: false,
      order: 0,
      publishedAt: new Date().toISOString(),
    },
  })

  console.log('\n✅ Testimonial created!')
  console.log(`   Client: ${testimonial.clientName}`)
  console.log(`   Company: ${testimonial.clientCompany}\n`)
}

// Start the vibe interface
vibe()
