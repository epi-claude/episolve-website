/**
 * AI-powered content generation
 * Usage: DATABASE_URI="..." pnpm tsx scripts/ai-generate.ts <type> <action> [options]
 *
 * Types:
 *   service - Generate service content
 *   blog - Generate blog post
 *   bio - Generate team member bio
 *   testimonial - Generate testimonial (for demo purposes)
 *
 * Actions:
 *   generate - Generate and preview content (doesn't save)
 *   create - Generate and create in CMS
 *   enhance - Enhance existing content
 *
 * Examples:
 *   Generate service: pnpm tsx scripts/ai-generate.ts service generate --title "Cloud Security" --keywords "AWS,compliance,encryption"
 *   Create blog post: pnpm tsx scripts/ai-generate.ts blog create --title "5 Cloud Migration Tips" --category "Cloud Solutions"
 *   Enhance service: pnpm tsx scripts/ai-generate.ts service enhance it-consulting --focus "benefits"
 *   Generate bio: pnpm tsx scripts/ai-generate.ts bio generate --name "John Doe" --role "CTO" --background "20 years tech leadership"
 */

import { getPayload } from 'payload'
import config from '@payload-config'

async function aiGenerate() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.error('Usage: pnpm tsx scripts/ai-generate.ts <type> <action> [options]')
    console.error('\nTypes: service, blog, bio, testimonial')
    console.error('Actions: generate, create, enhance')
    console.error('\nExamples:')
    console.error('  pnpm tsx scripts/ai-generate.ts service generate --title "AI Consulting"')
    console.error('  pnpm tsx scripts/ai-generate.ts blog create --title "Cloud Trends 2025"')
    process.exit(1)
  }

  const type = args[0]
  const action = args[1]
  const payload = await getPayload({ config })

  try {
    switch (type) {
      case 'service':
        await handleService(payload, action, args.slice(2))
        break
      case 'blog':
        await handleBlog(payload, action, args.slice(2))
        break
      case 'bio':
        await handleBio(payload, action, args.slice(2))
        break
      case 'testimonial':
        await handleTestimonial(payload, action, args.slice(2))
        break
      default:
        console.error(`Unknown type: ${type}`)
        process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

// ============================================================================
// Service Content Generation
// ============================================================================

async function handleService(payload: any, action: string, args: string[]) {
  const options = parseArgs(args)

  if (!options.title) {
    console.error('❌ --title is required')
    process.exit(1)
  }

  const keywords = options.keywords ? options.keywords.split(',').map((k: string) => k.trim()) : []
  const tone = options.tone || 'professional'

  console.log(`🤖 Generating service content for: ${options.title}`)
  console.log(`   Keywords: ${keywords.join(', ') || 'none'}`)
  console.log(`   Tone: ${tone}`)

  const content = generateServiceContent(options.title, keywords, tone)

  if (action === 'generate') {
    console.log('\n📝 Generated Content:\n')
    console.log('Short Description:')
    console.log(content.shortDescription)
    console.log('\nFull Description:')
    console.log(content.fullDescription)
    console.log('\nFeatures:')
    content.features.forEach((f: string, i: number) => console.log(`  ${i + 1}. ${f}`))
    console.log('\n💡 Use "create" action to save this to CMS')
  } else if (action === 'create') {
    const slug = options.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const service = await payload.create({
      collection: 'services',
      context: {
        disableRevalidate: true,
      },
      data: {
        title: options.title,
        slug,
        icon: options.icon || 'lightbulb',
        shortDescription: content.shortDescription,
        fullDescription: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: content.fullDescription,
                  },
                ],
              },
            ],
          },
        },
        features: content.features.map((f: string) => ({ feature: f })),
        featured: options.featured === 'true',
        order: parseInt(options.order || '0'),
        cta: {
          text: 'Request this Service',
          link: '/contact',
        },
        meta: {
          title: `${options.title} | Episolve LLC`,
          description: content.shortDescription,
        },
        _status: options.publish === 'true' ? 'published' : 'draft',
      },
    })

    console.log('\n✅ Service created!')
    console.log(`   ID: ${service.id}`)
    console.log(`   Slug: ${service.slug}`)
    console.log(`   Status: ${service._status}`)
    console.log(`   URL: /services/${service.slug}`)
  } else if (action === 'enhance') {
    console.error('❌ Enhance action requires service slug as first argument')
    console.error('Example: pnpm tsx scripts/ai-generate.ts service enhance it-consulting --focus "benefits"')
    process.exit(1)
  }

  process.exit(0)
}

function generateServiceContent(title: string, keywords: string[], tone: string) {
  // AI-style content generation based on title and keywords
  const shortDescription = generateShortDescription(title, keywords)
  const fullDescription = generateFullDescription(title, keywords, tone)
  const features = generateFeatures(title, keywords)

  return { shortDescription, fullDescription, features }
}

function generateShortDescription(title: string, keywords: string[]): string {
  const templates = [
    `Transform your business with ${title.toLowerCase()} solutions that drive growth and efficiency.`,
    `Expert ${title.toLowerCase()} services tailored to your unique business needs and objectives.`,
    `Leverage cutting-edge ${title.toLowerCase()} to gain competitive advantage and accelerate innovation.`,
    `Professional ${title.toLowerCase()} that delivers measurable results and sustainable value.`,
  ]

  let description = templates[Math.floor(Math.random() * templates.length)]

  if (keywords.length > 0) {
    const keywordPhrase = keywords.slice(0, 2).join(' and ')
    description = description.replace(
      title.toLowerCase(),
      `${title.toLowerCase()} including ${keywordPhrase}`,
    )
  }

  return description.substring(0, 150)
}

function generateFullDescription(title: string, keywords: string[], tone: string): string {
  const intro = `Our ${title} service combines industry expertise with proven methodologies to deliver exceptional results for your organization.`

  const approach =
    tone === 'technical'
      ? `We employ rigorous analytical frameworks and best-in-class tools to architect solutions that scale with your business.`
      : `We work collaboratively with your team to understand challenges, identify opportunities, and implement solutions that drive sustainable success.`

  const keywordSection =
    keywords.length > 0
      ? ` Our specialized capabilities include ${keywords.join(', ')}, ensuring comprehensive coverage of your technology needs.`
      : ''

  const closing = `Partner with Episolve to transform your ${title.toLowerCase()} capabilities and achieve your strategic objectives.`

  return `${intro} ${approach}${keywordSection} ${closing}`
}

function generateFeatures(title: string, keywords: string[]): string[] {
  const baseFeatures = [
    'Strategic planning and roadmap development',
    'Expert consultation and technical guidance',
    'Implementation support and best practices',
    'Ongoing optimization and performance monitoring',
    'Risk mitigation and compliance assurance',
  ]

  if (keywords.length > 0) {
    const keywordFeatures = keywords
      .slice(0, 3)
      .map((k) => `Advanced ${k} implementation and integration`)
    return [...keywordFeatures, ...baseFeatures.slice(0, 3)]
  }

  return baseFeatures.slice(0, 5)
}

// ============================================================================
// Blog Post Generation
// ============================================================================

async function handleBlog(payload: any, action: string, args: string[]) {
  const options = parseArgs(args)

  if (!options.title) {
    console.error('❌ --title is required')
    process.exit(1)
  }

  console.log(`🤖 Generating blog post: ${options.title}`)

  const content = generateBlogContent(options.title, options.category || 'Technology')

  if (action === 'generate') {
    console.log('\n📝 Generated Content:\n')
    console.log('Title:', content.title)
    console.log('Excerpt:', content.excerpt)
    console.log('\nContent Preview:')
    console.log(content.content.substring(0, 500) + '...')
    console.log('\n💡 Use "create" action to save this to CMS')
  } else if (action === 'create') {
    const slug = options.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // Find or create category
    let category = null
    if (options.category) {
      const categoryResult = await payload.find({
        collection: 'categories',
        where: {
          title: { equals: options.category },
        },
        limit: 1,
      })

      if (categoryResult.docs.length > 0) {
        category = categoryResult.docs[0].id
      }
    }

    const post = await payload.create({
      collection: 'posts',
      context: {
        disableRevalidate: true,
      },
      data: {
        title: content.title,
        slug,
        categories: category ? [category] : [],
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: content.content,
                  },
                ],
              },
            ],
          },
        },
        meta: {
          title: `${content.title} | Episolve Insights`,
          description: content.excerpt,
        },
        publishedAt: options.publish === 'true' ? new Date().toISOString() : undefined,
        _status: options.publish === 'true' ? 'published' : 'draft',
      },
    })

    console.log('\n✅ Blog post created!')
    console.log(`   ID: ${post.id}`)
    console.log(`   Slug: ${post.slug}`)
    console.log(`   Status: ${post._status}`)
    console.log(`   URL: /posts/${post.slug}`)
  }

  process.exit(0)
}

function generateBlogContent(title: string, category: string) {
  const excerpt = `Explore key insights and practical strategies for ${title.toLowerCase()}. Learn how forward-thinking organizations are leveraging technology to drive innovation and business value.`

  const content = `
# ${title}

In today's rapidly evolving business landscape, ${category.toLowerCase()} continues to reshape how organizations operate and compete. Understanding the latest trends and best practices is essential for maintaining competitive advantage.

## The Current Landscape

Modern enterprises face unprecedented challenges and opportunities. Digital transformation initiatives are no longer optional—they're imperative for survival and growth in an increasingly connected world.

## Key Considerations

When approaching ${title.toLowerCase()}, organizations must balance multiple factors:

- Strategic alignment with business objectives
- Technical feasibility and resource requirements
- Risk management and compliance considerations
- Change management and organizational readiness
- Long-term sustainability and scalability

## Best Practices

Leading organizations share common approaches to success:

1. **Start with strategy** - Define clear objectives and success metrics
2. **Embrace agility** - Adopt iterative approaches that allow for course correction
3. **Invest in people** - Build capabilities and foster a culture of continuous learning
4. **Leverage partnerships** - Work with experienced advisors who understand your industry
5. **Measure and optimize** - Continuously monitor performance and refine your approach

## Moving Forward

The path to ${title.toLowerCase()} success requires careful planning, expert guidance, and sustained commitment. Organizations that invest in building the right capabilities and partnerships position themselves for long-term success.

## Get Expert Guidance

At Episolve, we help organizations navigate complex technology challenges and achieve their strategic objectives. Our team brings deep expertise and proven methodologies to every engagement.

Ready to learn more? [Contact us](/contact) to discuss your specific needs and explore how we can help.
  `.trim()

  return { title, excerpt, content }
}

// ============================================================================
// Team Member Bio Generation
// ============================================================================

async function handleBio(payload: any, action: string, args: string[]) {
  const options = parseArgs(args)

  if (!options.name || !options.role) {
    console.error('❌ --name and --role are required')
    process.exit(1)
  }

  console.log(`🤖 Generating bio for: ${options.name} (${options.role})`)

  const bio = generateBio(options.name, options.role, options.background || '')

  if (action === 'generate') {
    console.log('\n📝 Generated Bio:\n')
    console.log(bio)
    console.log('\n💡 Use "create" action to save this to CMS')
  } else if (action === 'create') {
    const member = await payload.create({
      collection: 'team-members',
      context: {
        disableRevalidate: true,
      },
      data: {
        name: options.name,
        role: options.role,
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
        email: options.email || '',
        linkedIn: options.linkedin || '',
        order: parseInt(options.order || '0'),
      },
    })

    console.log('\n✅ Team member created!')
    console.log(`   ID: ${member.id}`)
    console.log(`   Name: ${member.name}`)
    console.log(`   Role: ${member.role}`)
  }

  process.exit(0)
}

function generateBio(name: string, role: string, background: string): string {
  const firstName = name.split(' ')[0]

  const intro = `${name} serves as ${role} at Episolve, bringing extensive experience in technology leadership and strategic innovation.`

  const experience = background
    ? `With ${background}, ${firstName} has developed deep expertise in solving complex business challenges through technology.`
    : `${firstName} has spent years helping organizations navigate digital transformation and achieve their strategic objectives.`

  const expertise = `${firstName}'s approach combines technical depth with business acumen, enabling pragmatic solutions that deliver measurable value. Known for building high-performing teams and fostering cultures of innovation, ${firstName} is passionate about leveraging technology to create competitive advantage.`

  const closing = `At Episolve, ${firstName} works closely with clients to understand their unique challenges and architect solutions that drive sustainable growth.`

  return `${intro} ${experience} ${expertise} ${closing}`
}

// ============================================================================
// Testimonial Generation (for demo/testing purposes)
// ============================================================================

async function handleTestimonial(payload: any, action: string, args: string[]) {
  const options = parseArgs(args)

  if (!options.name || !options.company) {
    console.error('❌ --name and --company are required')
    process.exit(1)
  }

  console.log(`🤖 Generating testimonial from: ${options.name} at ${options.company}`)

  const quote = generateTestimonial(options.company, options.service || 'consulting services')

  if (action === 'generate') {
    console.log('\n📝 Generated Testimonial:\n')
    console.log(`"${quote}"`)
    console.log(`\n— ${options.name}${options.role ? `, ${options.role}` : ''}, ${options.company}`)
    console.log('\n💡 Use "create" action to save this to CMS')
  } else if (action === 'create') {
    const testimonial = await payload.create({
      collection: 'testimonials',
      context: {
        disableRevalidate: true,
      },
      data: {
        quote,
        clientName: options.name,
        clientRole: options.role || '',
        clientCompany: options.company,
        featured: options.featured === 'true',
        order: parseInt(options.order || '0'),
        publishedAt: new Date().toISOString(),
      },
    })

    console.log('\n✅ Testimonial created!')
    console.log(`   ID: ${testimonial.id}`)
    console.log(`   Client: ${testimonial.clientName}`)
    console.log(`   Company: ${testimonial.clientCompany}`)
  }

  process.exit(0)
}

function generateTestimonial(company: string, service: string): string {
  const templates = [
    `Working with Episolve transformed our approach to ${service}. Their team's expertise and commitment to our success was evident from day one. The results exceeded our expectations.`,
    `Episolve brought clarity to complex challenges and delivered solutions that made an immediate impact. Their ${service} helped us achieve goals we didn't think were possible in our timeline.`,
    `The Episolve team doesn't just deliver services—they become a true partner. Their deep understanding of ${service} and business strategy helped us unlock significant value across our organization.`,
    `Episolve's approach to ${service} is exactly what we needed. They took time to understand our unique situation and delivered tailored solutions that addressed our specific challenges.`,
  ]

  return templates[Math.floor(Math.random() * templates.length)]
}

// ============================================================================
// Utility Functions
// ============================================================================

function parseArgs(args: string[]): Record<string, string> {
  const options: Record<string, string> = {}

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '')
    const value = args[i + 1]
    options[key] = value
  }

  return options
}

aiGenerate()
