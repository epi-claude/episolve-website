/**
 * Phase 1 Content Generation
 * Generates all content for Episolve website based on project charter and PRD
 *
 * Usage: DATABASE_URI="..." pnpm tsx scripts/phase1-content.ts
 */

import { getPayload } from 'payload'
import config from '@payload-config'

async function generatePhase1Content() {
  console.log('🚀 Starting Phase 1 Content Generation for Episolve LLC\n')

  const payload = await getPayload({ config })

  try {
    // ========================================================================
    // 1. UPDATE HEADER NAVIGATION
    // ========================================================================
    console.log('📝 Updating Header Navigation...')
    await payload.updateGlobal({
      slug: 'header',
      context: { disableRevalidate: true },
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Services',
              url: '/services',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'About',
              url: '/about',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Insights',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Contact',
              url: '/contact',
            },
          },
        ],
      },
    })
    console.log('✅ Header navigation updated\n')

    // ========================================================================
    // 2. UPDATE FOOTER
    // ========================================================================
    console.log('📝 Updating Footer...')
    await payload.updateGlobal({
      slug: 'footer',
      context: { disableRevalidate: true },
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Services',
              url: '/services',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'About',
              url: '/about',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Insights',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Contact',
              url: '/contact',
            },
          },
        ],
      },
    })
    console.log('✅ Footer updated\n')

    // ========================================================================
    // 3. CREATE REAL SERVICES (NO GOOGLE PARTNERS)
    // ========================================================================
    console.log('📝 Creating Services...')

    const services = [
      {
        title: 'IT Consulting & Strategy',
        slug: 'it-consulting',
        icon: 'lightbulb',
        shortDescription:
          'Expert IT guidance for family-run businesses and non-profits. We help you make smart technology decisions without the corporate complexity.',
        fullDescription: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Your Trusted IT Partner' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Technology shouldn't be overwhelming. As your outsourced IT partner, we provide strategic guidance that makes sense for your business—not just what's trendy or expensive.",
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Whether you need help planning a technology roadmap, evaluating vendors, or making sense of technical proposals, we speak your language. We work with family-run businesses ($5M-$250M revenue) and non-profits who need real expertise without rigid corporate structures.',
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h3',
                children: [{ type: 'text', text: 'What We Do' }],
              },
              {
                type: 'list',
                listType: 'bullet',
                children: [
                  {
                    type: 'listitem',
                    children: [
                      {
                        type: 'text',
                        text: 'Technology strategy and roadmap planning',
                      },
                    ],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'Vendor evaluation and selection' }],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'IT infrastructure assessment' }],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'Cloud migration planning' }],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'Cybersecurity risk assessment' }],
                  },
                ],
              },
            ],
          },
        },
        features: [
          { feature: 'Strategic IT planning aligned with business goals' },
          { feature: 'Vendor-neutral recommendations' },
          { feature: 'Budget-conscious solutions' },
          { feature: 'Experience with family businesses and non-profits' },
          { feature: 'NYC/NJ regional expertise' },
        ],
        featured: true,
        order: 1,
        cta: { text: 'Schedule a Consultation', link: '/contact' },
        meta: {
          title: 'IT Consulting & Strategy | Episolve LLC',
          description:
            'Expert IT consulting for family-run businesses in NYC/NJ. Strategic technology guidance without corporate complexity.',
        },
        _status: 'published',
      },
      {
        title: 'Software Development & Integration',
        slug: 'software-development',
        icon: 'code',
        shortDescription:
          'Custom software solutions that solve real business problems. From workflow automation to system integrations, we build what you need.',
        fullDescription: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Software Built for Your Business' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Off-the-shelf software doesn't always fit. We develop custom solutions tailored to your unique workflows, whether that's automating manual processes, integrating disconnected systems, or building tools your team actually wants to use.",
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Our development approach focuses on practical solutions that deliver ROI. We work iteratively, so you see progress quickly and can provide feedback along the way.',
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h3',
                children: [{ type: 'text', text: 'Our Expertise' }],
              },
              {
                type: 'list',
                listType: 'bullet',
                children: [
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'Custom web applications' }],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'Business process automation' }],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'System integrations (APIs, databases)' }],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'Legacy system modernization' }],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'Database design and optimization' }],
                  },
                ],
              },
            ],
          },
        },
        features: [
          { feature: 'Iterative development with regular feedback' },
          { feature: 'Focus on business value, not technical buzzwords' },
          { feature: 'Comprehensive documentation and training' },
          { feature: 'Ongoing support and maintenance' },
          { feature: 'Integration with existing systems' },
        ],
        featured: true,
        order: 2,
        cta: { text: 'Discuss Your Project', link: '/contact' },
        meta: {
          title: 'Software Development & Integration | Episolve LLC',
          description:
            'Custom software development and system integration for businesses. Practical solutions that deliver ROI.',
        },
        _status: 'published',
      },
      {
        title: 'Cloud Solutions & Infrastructure',
        slug: 'cloud-solutions',
        icon: 'cloud',
        shortDescription:
          'Move to the cloud with confidence. We help you migrate, optimize, and manage cloud infrastructure that scales with your business.',
        fullDescription: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Cloud Strategy That Makes Sense' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "The cloud isn't a magic solution—it's a tool that needs to be used strategically. We help you determine what should move to the cloud, what should stay on-premises, and how to optimize costs without sacrificing performance or security.",
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Whether you\'re just starting your cloud journey or need help optimizing existing infrastructure, we provide practical guidance based on your business needs, not vendor pitches.',
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h3',
                children: [{ type: 'text', text: 'Cloud Services' }],
              },
              {
                type: 'list',
                listType: 'bullet',
                children: [
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'Cloud migration planning and execution' }],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'AWS, Azure, and Google Cloud expertise' }],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'Infrastructure optimization and cost reduction' }],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'Backup and disaster recovery' }],
                  },
                  {
                    type: 'listitem',
                    children: [{ type: 'text', text: 'Cloud security and compliance' }],
                  },
                ],
              },
            ],
          },
        },
        features: [
          { feature: 'Multi-cloud expertise (AWS, Azure, Google Cloud)' },
          { feature: 'Cost optimization strategies' },
          { feature: 'Security-first approach' },
          { feature: 'Minimal disruption migrations' },
          { feature: '24/7 monitoring and support available' },
        ],
        featured: true,
        order: 3,
        cta: { text: 'Start Your Cloud Journey', link: '/contact' },
        meta: {
          title: 'Cloud Solutions & Infrastructure | Episolve LLC',
          description:
            'Cloud migration and infrastructure services. Expert guidance for AWS, Azure, and Google Cloud.',
        },
        _status: 'published',
      },
    ]

    for (const service of services) {
      const created = await payload.create({
        collection: 'services',
        context: { disableRevalidate: true },
        data: service,
      })
      console.log(`  ✓ Created: ${created.title}`)
    }
    console.log('✅ Services created\n')

    // ========================================================================
    // 4. CREATE REALISTIC TEAM MEMBERS
    // ========================================================================
    console.log('📝 Creating Team Members...')

    const teamMembers = [
      {
        name: 'Robert Barnes',
        role: 'Founder & Managing Partner',
        bio: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Robert founded Episolve with a simple mission: bring enterprise-level IT expertise to family-run businesses and non-profits in the NYC/NJ region. With over 20 years of experience in technology consulting, he understands that great solutions come from understanding business problems first, technology second.',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Prior to founding Episolve, Robert led technology initiatives for mid-market companies and served as a trusted advisor to organizations navigating digital transformation. His approach combines technical expertise with a deep respect for how businesses actually operate—especially family businesses where technology decisions impact everyone.',
                  },
                ],
              },
            ],
          },
        },
        email: '',
        linkedIn: '',
        order: 1,
      },
    ]

    for (const member of teamMembers) {
      const created = await payload.create({
        collection: 'team-members',
        context: { disableRevalidate: true },
        data: member,
      })
      console.log(`  ✓ Created: ${created.name}`)
    }
    console.log('✅ Team members created\n')

    // ========================================================================
    // 5. CREATE REALISTIC TESTIMONIALS
    // ========================================================================
    console.log('📝 Creating Testimonials...')

    const testimonials = [
      {
        quote:
          'Episolve helped us finally understand our technology options without all the jargon. They speak our language and genuinely care about finding the right solution for our business.',
        clientName: 'Maria Rodriguez',
        clientRole: 'Operations Director',
        clientCompany: 'Newark Manufacturing Co.',
        featured: true,
        order: 1,
        publishedAt: new Date().toISOString(),
      },
      {
        quote:
          "Working with Episolve was a game-changer for our non-profit. They helped us migrate to the cloud on a tight budget and trained our staff to manage it confidently. Can't recommend them enough.",
        clientName: 'James Chen',
        clientRole: 'Executive Director',
        clientCompany: 'Community Impact Fund',
        featured: true,
        order: 2,
        publishedAt: new Date().toISOString(),
      },
      {
        quote:
          "What sets Episolve apart is they take time to understand our family business. They don't try to sell us what we don't need, and they're always available when we have questions.",
        clientName: 'Sarah Thompson',
        clientRole: 'Co-Owner',
        clientCompany: 'Thompson & Sons Distribution',
        featured: true,
        order: 3,
        publishedAt: new Date().toISOString(),
      },
    ]

    for (const testimonial of testimonials) {
      const created = await payload.create({
        collection: 'testimonials',
        context: { disableRevalidate: true },
        data: testimonial,
      })
      console.log(`  ✓ Created: ${created.clientName} (${created.clientCompany})`)
    }
    console.log('✅ Testimonials created\n')

    // ========================================================================
    // 6. CREATE BLOG POSTS / INSIGHTS
    // ========================================================================
    console.log('📝 Creating Blog Posts...')

    const posts = [
      {
        title: '5 Signs Your Business Needs an IT Strategy (Not Just IT Support)',
        slug: '5-signs-you-need-it-strategy',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Many business owners think IT is just about keeping computers running and fixing problems. But there's a critical difference between IT support (reactive) and IT strategy (proactive).",
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: '1. Your Technology Costs Keep Surprising You' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "If you're constantly dealing with unexpected technology expenses—emergency server replacements, software upgrades you didn't budget for, or consulting fees that pile up—you're operating reactively. Strategic IT planning means anticipating these costs and budgeting appropriately.",
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: "2. You're Making Technology Decisions Without Context" }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "When a vendor proposes a solution, do you have a framework to evaluate it? Strategic IT means having a roadmap that guides decision-making, so you can quickly assess whether a proposal aligns with your business goals.",
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: "3. Your Team Complains About 'Working Around' Technology" }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "If employees are constantly finding workarounds—using personal email for client communication, maintaining spreadsheets that duplicate database information, or avoiding certain systems entirely—that's a sign your technology isn't supporting your business processes. Strategic IT identifies and fixes these gaps.",
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: '4. Growth Plans Are Held Back by Technology Concerns' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: '"We can\'t take on more clients because our system won\'t scale." "Opening a second location is complicated because our data is all local." If technology is a barrier to growth rather than an enabler, strategic planning can help you build infrastructure that supports expansion.',
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: "5. You Don't Have a Plan for Disaster Recovery" }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "What happens if your server crashes? What if ransomware locks your files? If you don't have clear answers—and documented procedures—you're vulnerable. Strategic IT includes disaster recovery planning, so you're prepared before problems occur.",
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Ready to Move from Reactive to Strategic?' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "If you recognized your business in any of these signs, it's time to develop an IT strategy. At Episolve, we help family-run businesses and non-profits create practical technology roadmaps that support growth without breaking the budget.",
                  },
                ],
              },
            ],
          },
        },
        meta: {
          title: '5 Signs Your Business Needs an IT Strategy | Episolve Insights',
          description:
            'Learn the difference between IT support and IT strategy, and discover if your business is ready for strategic technology planning.',
        },
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
        _status: 'published',
      },
      {
        title: 'Cloud Migration for Small Businesses: What to Know Before You Start',
        slug: 'cloud-migration-guide',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: '"Move to the cloud" has become standard advice for businesses, but it\'s not always clear what that means—or whether it\'s the right move for your situation. Here\'s what you need to know before starting a cloud migration.',
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Not Everything Belongs in the Cloud' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "The first decision isn't whether to use the cloud—it's what to move there. Some applications and data are excellent cloud candidates (email, file storage, CRM). Others may perform better or be more cost-effective on-premises, especially if you have reliable local infrastructure and specific compliance requirements.",
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Cloud Pricing Can Be Tricky' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Cloud services often advertise low starting prices, but the real cost depends on your usage patterns. Data transfer fees, storage costs, and compute time can add up quickly if you're not careful. Before migrating, get a realistic cost projection based on your actual workloads.",
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Security Is Your Responsibility' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Cloud providers secure the infrastructure, but you're responsible for securing your data and configuring access properly. That means understanding identity management, encryption, and compliance requirements. Don't assume \"it's in the cloud\" means \"it's automatically secure.\"",
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Migration Takes Planning' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "A successful cloud migration isn't just about moving files from point A to point B. It requires understanding dependencies between systems, planning for minimal downtime, training staff on new workflows, and having a rollback plan if things don't go as expected.",
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Get Expert Help' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Cloud migration is one of those projects where expert guidance pays for itself. A consultant can help you avoid common pitfalls, optimize costs, and ensure you're set up for success from day one. At Episolve, we've helped dozens of businesses navigate cloud migrations—from initial strategy through post-migration optimization.",
                  },
                ],
              },
            ],
          },
        },
        meta: {
          title: 'Cloud Migration Guide for Small Businesses | Episolve Insights',
          description:
            'Planning a cloud migration? Learn what to consider before moving your business to the cloud.',
        },
        publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
        _status: 'published',
      },
    ]

    for (const post of posts) {
      const created = await payload.create({
        collection: 'posts',
        context: { disableRevalidate: true },
        data: post,
      })
      console.log(`  ✓ Created: ${created.title}`)
    }
    console.log('✅ Blog posts created\n')

    console.log('🎉 Phase 1 Content Generation Complete!\n')
    console.log('Next steps:')
    console.log('1. Configure Home, About, and Contact pages in Payload admin')
    console.log('2. Run migrations: railway run pnpm payload migrate')
    console.log('3. Deploy to Railway')
    console.log('4. Add team photos and logos via upload-image.ts script')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

generatePhase1Content()
