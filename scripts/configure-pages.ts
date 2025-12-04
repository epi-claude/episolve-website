/**
 * Configure core pages (Home, About, Contact) with proper content blocks
 * Usage: DATABASE_URI="..." pnpm tsx scripts/configure-pages.ts
 */

import { getPayload } from 'payload'
import config from '@payload-config'

async function configurePages() {
  console.log('📄 Configuring Pages...\n')

  const payload = await getPayload({ config })

  try {
    // ========================================================================
    // 1. HOME PAGE
    // ========================================================================
    console.log('🏠 Configuring Home Page...')

    // Find or create home page
    let homePage = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    const homePageData = {
      title: 'Home',
      slug: 'home',
      hero: {
        type: 'highImpact',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [{ type: 'text', text: 'Technology Solutions for Business Problems' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Expert IT consulting for family-run businesses and non-profits in the NYC/NJ region. We speak your language, not tech jargon.',
                  },
                ],
              },
            ],
          },
        },
        links: [
          {
            link: {
              type: 'custom',
              label: 'Book a Consultation',
              url: '/contact',
              appearance: 'primary',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Our Services',
              url: '/services',
              appearance: 'secondary',
            },
          },
        ],
      },
      layout: [
        // Services Overview
        {
          blockType: 'content',
          blockName: 'Services Overview',
          columns: [
            {
              size: 'full',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'How We Help' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'From strategic IT planning to custom software development, we provide the technology expertise your business needs to thrive.',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        // Stats
        {
          blockType: 'stats',
          heading: 'Trusted by Businesses Like Yours',
          stats: [
            { value: '15+', label: 'Years Experience' },
            { value: '100+', label: 'Clients Served' },
            { value: '99%', label: 'Client Satisfaction' },
          ],
          columns: '3',
        },
        // Value Propositions
        {
          blockType: 'content',
          blockName: 'Why Episolve',
          columns: [
            {
              size: 'threeQuarters',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'Why Choose Episolve' }],
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          blockType: 'content',
          blockName: 'Value Props Grid',
          columns: [
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'We Speak Your Language' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'No tech jargon. We explain technology in terms of business outcomes, not buzzwords.',
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'Family Business Focus' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'We understand the unique dynamics of family-run businesses and non-profits.',
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'Regional Expertise' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Based in the NYC/NJ tristate area, we understand local business challenges.',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        // Testimonials
        {
          blockType: 'testimonials',
          heading: 'What Our Clients Say',
          source: 'featured',
          limit: 3,
        },
        // CTA
        {
          blockType: 'cta',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: "Ready to Transform Your Technology?" }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: "Let's talk about your challenges and explore how we can help.",
                    },
                  ],
                },
              ],
            },
          },
          links: [
            {
              link: {
                type: 'custom',
                label: 'Schedule a Consultation',
                url: '/contact',
                appearance: 'primary',
              },
            },
          ],
        },
      ],
      meta: {
        title: 'Episolve LLC | Technology Solutions for Business Problems',
        description:
          'Expert IT consulting for family-run businesses and non-profits in NYC/NJ. Strategic technology guidance without corporate complexity.',
      },
      _status: 'published',
      publishedAt: new Date().toISOString(),
    }

    if (homePage.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: homePage.docs[0].id,
        context: { disableRevalidate: true },
        data: homePageData,
      })
    } else {
      await payload.create({
        collection: 'pages',
        context: { disableRevalidate: true },
        data: homePageData,
      })
    }
    console.log('✅ Home page configured\n')

    // ========================================================================
    // 2. ABOUT PAGE
    // ========================================================================
    console.log('ℹ️  Configuring About Page...')

    let aboutPage = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about' } },
      limit: 1,
    })

    const aboutPageData = {
      title: 'About Episolve',
      slug: 'about',
      hero: {
        type: 'mediumImpact',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [{ type: 'text', text: 'About Episolve' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'We help family-run businesses and non-profits navigate technology without the corporate complexity.',
                  },
                ],
              },
            ],
          },
        },
      },
      layout: [
        // Company Story
        {
          blockType: 'content',
          blockName: 'Our Story',
          columns: [
            {
              size: 'twoThirds',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'Our Story' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Episolve was founded with a simple observation: family-run businesses and non-profits need technology expertise, but they don\'t need—and often can\'t afford—the overhead of enterprise consulting firms.',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: "We focus on practical solutions that deliver real business value. That means understanding your operations first, technology second. It means explaining options clearly, without jargon. And it means building relationships where you feel comfortable asking 'dumb' questions—because there's no such thing.",
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Based in the NYC/NJ tristate area, we work with organizations ranging from $5M to $250M in revenue—companies large enough to need serious IT expertise, but small enough to value personal relationships.',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        // Mission/Values
        {
          blockType: 'content',
          blockName: 'Our Values',
          columns: [
            {
              size: 'full',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'Our Values' }],
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          blockType: 'content',
          blockName: 'Values Grid',
          columns: [
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'Clarity Over Jargon' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'We explain technology in plain language. If you don\'t understand something, that\'s our fault, not yours.',
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'Value Over Features' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'We recommend solutions based on business value, not what\'s trendy or profitable for vendors.',
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'Partnership Over Transactions' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'We build long-term relationships. Your success is our success.',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        // Team Section
        {
          blockType: 'content',
          blockName: 'Meet the Team',
          columns: [
            {
              size: 'full',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'Meet the Team' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Our team brings decades of combined experience in technology consulting, software development, and infrastructure management—all focused on helping businesses like yours succeed.',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        // CTA
        {
          blockType: 'cta',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Let\'s Work Together' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Ready to see how we can help your business? Get in touch.',
                    },
                  ],
                },
              ],
            },
          },
          links: [
            {
              link: {
                type: 'custom',
                label: 'Contact Us',
                url: '/contact',
                appearance: 'primary',
              },
            },
          ],
        },
      ],
      meta: {
        title: 'About Episolve | Technology Consulting for Family Businesses',
        description:
          'Learn about Episolve and our mission to bring enterprise IT expertise to family-run businesses and non-profits.',
        },
      _status: 'published',
      publishedAt: new Date().toISOString(),
    }

    if (aboutPage.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: aboutPage.docs[0].id,
        context: { disableRevalidate: true },
        data: aboutPageData,
      })
    } else {
      await payload.create({
        collection: 'pages',
        context: { disableRevalidate: true },
        data: aboutPageData,
      })
    }
    console.log('✅ About page configured\n')

    // ========================================================================
    // 3. CONTACT PAGE
    // ========================================================================
    console.log('📞 Configuring Contact Page...')

    let contactPage = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'contact' } },
      limit: 1,
    })

    const contactPageData = {
      title: 'Contact Us',
      slug: 'contact',
      hero: {
        type: 'lowImpact',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [{ type: 'text', text: 'Let\'s Talk' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Ready to discuss your technology challenges? Reach out and we\'ll schedule a consultation.',
                  },
                ],
              },
            ],
          },
        },
      },
      layout: [
        // Two options: Form + Booking
        {
          blockType: 'content',
          blockName: 'Two Ways to Connect',
          columns: [
            {
              size: 'half',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'Send Us a Message' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Fill out the form below and we\'ll get back to you within one business day.',
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              size: 'half',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'Book a Consultation' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Prefer to schedule a call? Use our booking calendar to find a time that works for you.',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        // Form Block (using FormBlock)
        {
          blockType: 'formBlock',
          form: null, // Will be configured in Payload admin
          enableIntro: true,
          introContent: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Tell us about your project or question and we\'ll get back to you soon.',
                },
              ],
            },
          ],
        },
        // Contact Info
        {
          blockType: 'content',
          blockName: 'Contact Information',
          columns: [
            {
              size: 'half',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'Get in Touch' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Serving the NYC/NJ Tristate Area',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Phone: (Available upon request)',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Email: info@episolve.com',
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              size: 'half',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'Business Hours' }],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Weekend support available for emergencies.',
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
        title: 'Contact Episolve | Get Technology Consulting',
        description:
          'Contact Episolve for expert IT consulting. Serving family businesses and non-profits in NYC/NJ.',
      },
      _status: 'published',
      publishedAt: new Date().toISOString(),
    }

    if (contactPage.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: contactPage.docs[0].id,
        context: { disableRevalidate: true },
        data: contactPageData,
      })
    } else {
      await payload.create({
        collection: 'pages',
        context: { disableRevalidate: true },
        data: contactPageData,
      })
    }
    console.log('✅ Contact page configured\n')

    console.log('🎉 All pages configured successfully!\n')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

configurePages()
