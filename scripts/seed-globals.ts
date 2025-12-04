import { getPayload } from 'payload'
import config from '@payload-config'

async function seed() {
  const payload = await getPayload({ config })

  try {
    // Check if header exists
    const headers = await payload.findGlobal({
      slug: 'header',
    })

    if (!headers) {
      console.log('Creating header global...')
      await payload.updateGlobal({
        slug: 'header',
        data: {
          navItems: [],
          ctaButton: {
            enabled: false,
            text: 'Book a Consultation',
            link: '/contact',
            newTab: false,
          },
        },
      })
      console.log('✓ Header global created')
    } else {
      console.log('Header global already exists')
    }

    // Check if footer exists
    const footers = await payload.findGlobal({
      slug: 'footer',
    })

    if (!footers) {
      console.log('Creating footer global...')
      await payload.updateGlobal({
        slug: 'footer',
        data: {
          navItems: [],
          companyInfo: {
            address: '',
            phone: '',
            email: '',
            hours: '',
          },
          socialLinks: [],
          newsletterCTA: '',
        },
      })
      console.log('✓ Footer global created')
    } else {
      console.log('Footer global already exists')
    }

    console.log('\n✓ Globals seeding complete!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding globals:', error)
    process.exit(1)
  }
}

seed()
