import { getPayload } from 'payload'
import config from '@payload-config'

async function seedContent() {
  const payload = await getPayload({ config })

  try {
    console.log('🌱 Starting content seeding...\n')

    // ============================================
    // 1. Configure Header Navigation
    // ============================================
    console.log('📋 Configuring Header navigation...')
    await payload.updateGlobal({
      slug: 'header',
      context: {
        disableRevalidate: true,
      },
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              url: '/services',
              label: 'Services',
              newTab: false,
            },
          },
          {
            link: {
              type: 'custom',
              url: '/about',
              label: 'About',
              newTab: false,
            },
          },
          {
            link: {
              type: 'custom',
              url: '/posts',
              label: 'Insights',
              newTab: false,
            },
          },
          {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'Contact',
              newTab: false,
            },
          },
        ],
        ctaButton: {
          enabled: true,
          text: 'Book a Consultation',
          link: '/contact',
          newTab: false,
        },
      },
    })
    console.log('✓ Header navigation configured\n')

    // ============================================
    // 2. Configure Footer
    // ============================================
    console.log('📋 Configuring Footer...')
    await payload.updateGlobal({
      slug: 'footer',
      context: {
        disableRevalidate: true,
      },
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              url: '/services',
              label: 'Services',
              newTab: false,
            },
          },
          {
            link: {
              type: 'custom',
              url: '/about',
              label: 'About',
              newTab: false,
            },
          },
          {
            link: {
              type: 'custom',
              url: '/posts',
              label: 'Insights',
              newTab: false,
            },
          },
          {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'Contact',
              newTab: false,
            },
          },
        ],
        companyInfo: {
          address: '123 Business Street\nSuite 100\nCity, State 12345',
          phone: '+1 (555) 123-4567',
          email: 'contact@episolve.com',
          hours: 'Mon-Fri 9am-5pm EST',
        },
        socialLinks: [
          {
            platform: 'linkedin',
            url: 'https://linkedin.com/company/episolve',
            newTab: true,
          },
          {
            platform: 'twitter',
            url: 'https://twitter.com/episolve',
            newTab: true,
          },
        ],
        newsletterCTA: 'Stay updated with our latest insights and solutions',
      },
    })
    console.log('✓ Footer configured\n')

    // ============================================
    // 3. Create Sample Services
    // ============================================
    console.log('🔧 Creating sample services...')

    const services = [
      {
        title: 'IT Consulting',
        icon: 'lightbulb',
        shortDescription:
          'Strategic technology guidance to optimize your IT infrastructure and drive business growth.',
        fullDescription: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Our IT consulting services help businesses navigate the complex technology landscape. We provide expert guidance on infrastructure optimization, technology strategy, and digital transformation initiatives.',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'With years of experience across diverse industries, we deliver actionable insights that align technology investments with your business objectives.',
                  },
                ],
              },
            ],
          },
        },
        features: [
          { feature: 'Technology strategy and roadmap development' },
          { feature: 'Infrastructure assessment and optimization' },
          { feature: 'Vendor selection and management' },
          { feature: 'IT budgeting and cost optimization' },
          { feature: 'Digital transformation planning' },
        ],
        featured: true,
        order: 1,
        cta: {
          text: 'Request IT Consulting',
          link: '/contact',
        },
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
      {
        title: 'Custom Software Development',
        icon: 'code',
        shortDescription:
          'Build scalable, high-performance applications tailored to your unique business requirements.',
        fullDescription: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Transform your ideas into powerful software solutions. Our development team specializes in creating custom applications that solve complex business challenges and deliver measurable results.',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'From web applications to mobile apps and enterprise systems, we leverage modern technologies and best practices to build solutions that scale with your business.',
                  },
                ],
              },
            ],
          },
        },
        features: [
          { feature: 'Full-stack web application development' },
          { feature: 'Mobile app development (iOS & Android)' },
          { feature: 'API design and integration' },
          { feature: 'Database design and optimization' },
          { feature: 'DevOps and CI/CD implementation' },
        ],
        featured: true,
        order: 2,
        cta: {
          text: 'Start Your Project',
          link: '/contact',
        },
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
      {
        title: 'Cloud Solutions',
        icon: 'cloud',
        shortDescription:
          'Migrate, optimize, and manage your infrastructure with modern cloud technologies.',
        fullDescription: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Harness the power of cloud computing to improve scalability, reduce costs, and enhance business agility. We help organizations successfully transition to and optimize cloud environments.',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Our cloud experts work with leading platforms including AWS, Azure, and Google Cloud to design and implement solutions that meet your specific needs.',
                  },
                ],
              },
            ],
          },
        },
        features: [
          { feature: 'Cloud migration planning and execution' },
          { feature: 'Infrastructure as Code (IaC) implementation' },
          { feature: 'Cost optimization and right-sizing' },
          { feature: 'Security and compliance configuration' },
          { feature: '24/7 monitoring and support' },
        ],
        featured: true,
        order: 3,
        cta: {
          text: 'Explore Cloud Options',
          link: '/contact',
        },
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
    ]

    for (const service of services) {
      const created = await payload.create({
        collection: 'services',
        context: {
          disableRevalidate: true,
        },
        data: service,
      })
      console.log(`  ✓ Created service: ${created.title}`)
    }
    console.log()

    // ============================================
    // 4. Create Sample Team Members
    // ============================================
    console.log('👥 Creating team members...')

    const teamMembers = [
      {
        name: 'John Smith',
        role: 'Chief Executive Officer',
        email: 'john.smith@episolve.com',
        linkedIn: 'https://linkedin.com/in/johnsmith',
        order: 1,
      },
      {
        name: 'Sarah Johnson',
        role: 'Chief Technology Officer',
        email: 'sarah.johnson@episolve.com',
        linkedIn: 'https://linkedin.com/in/sarahjohnson',
        order: 2,
      },
      {
        name: 'Michael Chen',
        role: 'Head of Consulting',
        email: 'michael.chen@episolve.com',
        linkedIn: 'https://linkedin.com/in/michaelchen',
        order: 3,
      },
    ]

    for (const member of teamMembers) {
      const created = await payload.create({
        collection: 'team-members',
        data: member,
      })
      console.log(`  ✓ Created team member: ${created.name}`)
    }
    console.log()

    // ============================================
    // 5. Create Sample Testimonials
    // ============================================
    console.log('💬 Creating testimonials...')

    const testimonials = [
      {
        quote:
          'Episolve transformed our outdated infrastructure into a modern, cloud-based system. The results exceeded our expectations in both performance and cost savings.',
        clientName: 'David Martinez',
        clientRole: 'CTO',
        clientCompany: 'TechCorp Industries',
        featured: true,
        order: 1,
        publishedAt: new Date().toISOString(),
      },
      {
        quote:
          'The team at Episolve delivered our custom application on time and within budget. Their expertise and professionalism made the entire process smooth and stress-free.',
        clientName: 'Emily Roberts',
        clientRole: 'VP of Operations',
        clientCompany: 'Global Solutions Inc',
        featured: true,
        order: 2,
        publishedAt: new Date().toISOString(),
      },
      {
        quote:
          'Working with Episolve has been a game-changer for our business. Their consulting services helped us make strategic technology decisions that positioned us for growth.',
        clientName: 'Robert Kim',
        clientRole: 'CEO',
        clientCompany: 'Innovation Partners',
        featured: false,
        order: 3,
        publishedAt: new Date().toISOString(),
      },
    ]

    for (const testimonial of testimonials) {
      const created = await payload.create({
        collection: 'testimonials',
        data: testimonial,
      })
      console.log(`  ✓ Created testimonial from: ${created.clientName}`)
    }
    console.log()

    // ============================================
    // 6. Create Home Page (skipped - create via admin or separate script)
    // ============================================
    console.log('🏠 Skipping Home page creation (use admin interface)...')

    /* await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        hero: {
          type: 'highImpact',
          richText: [
            {
              children: [
                {
                  text: 'Technology Solutions for Business Problems',
                  type: 'h1',
                },
              ],
            },
            {
              children: [
                {
                  text: 'We help businesses leverage technology to solve complex challenges, drive growth, and achieve their strategic objectives.',
                },
              ],
            },
          ],
          links: [
            {
              link: {
                type: 'custom',
                url: '/contact',
                label: 'Book a Consultation',
                appearance: 'primary',
              },
            },
            {
              link: {
                type: 'custom',
                url: '/services',
                label: 'Our Services',
                appearance: 'default',
              },
            },
          ],
        },
        layout: [
          {
            blockType: 'content',
            blockName: 'Services Overview',
            columns: [
              {
                size: 'oneThird',
                richText: [
                  {
                    children: [{ text: 'IT Consulting', type: 'h3' }],
                  },
                  {
                    children: [
                      {
                        text: 'Strategic technology guidance to optimize your IT infrastructure and drive business growth.',
                      },
                    ],
                  },
                ],
                enableLink: true,
                link: {
                  type: 'custom',
                  url: '/services',
                  label: 'Learn More',
                },
              },
              {
                size: 'oneThird',
                richText: [
                  {
                    children: [{ text: 'Custom Software', type: 'h3' }],
                  },
                  {
                    children: [
                      {
                        text: 'Build scalable, high-performance applications tailored to your unique business requirements.',
                      },
                    ],
                  },
                ],
                enableLink: true,
                link: {
                  type: 'custom',
                  url: '/services',
                  label: 'Learn More',
                },
              },
              {
                size: 'oneThird',
                richText: [
                  {
                    children: [{ text: 'Cloud Solutions', type: 'h3' }],
                  },
                  {
                    children: [
                      {
                        text: 'Migrate, optimize, and manage your infrastructure with modern cloud technologies.',
                      },
                    ],
                  },
                ],
                enableLink: true,
                link: {
                  type: 'custom',
                  url: '/services',
                  label: 'Learn More',
                },
              },
            ],
          },
          {
            blockType: 'cta',
            blockName: 'Get Started CTA',
            richText: [
              {
                children: [{ text: 'Ready to Transform Your Business?', type: 'h2' }],
              },
              {
                children: [
                  {
                    text: "Let's discuss how our technology solutions can help you achieve your goals.",
                  },
                ],
              },
            ],
            links: [
              {
                link: {
                  type: 'custom',
                  url: '/contact',
                  label: 'Get in Touch',
                  appearance: 'primary',
                },
              },
            ],
          },
        ],
        meta: {
          title: 'Episolve LLC - Technology Solutions for Business Problems',
          description:
            'Expert IT consulting, custom software development, and cloud solutions to help your business thrive in the digital age.',
        },
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
    }) */
    console.log('✓ Home page skipped (create manually via admin)\n')

    // ============================================
    // Success Summary
    // ============================================
    console.log('✅ Content seeding complete!\n')
    console.log('Summary:')
    console.log('  • Header navigation configured')
    console.log('  • Footer configured with company info')
    console.log(`  • ${services.length} services created`)
    console.log(`  • ${teamMembers.length} team members created`)
    console.log(`  • ${testimonials.length} testimonials created`)
    console.log('  • Home page skipped (create via admin)')
    console.log('\nNext steps:')
    console.log('  • Visit /services to see the services listing')
    console.log('  • Create Home, About, and Contact pages via admin or AI scripts')
    console.log('  • Add team member photos and bios')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding content:', error)
    process.exit(1)
  }
}

seedContent()
