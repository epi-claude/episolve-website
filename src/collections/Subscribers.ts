import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'createdAt'],
    group: 'CRM',
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Footer', value: 'footer' },
        { label: 'Blog Post', value: 'blog' },
        { label: 'Home Page', value: 'home' },
        { label: 'Contact Page', value: 'contact' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
      defaultValue: 'active',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'highLevelId',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Automatically synced from HighLevel integration',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Only process on create
        if (operation === 'create') {
          console.log('📧 New subscriber:', doc.email)

          // TODO: Sync to HighLevel with "Newsletter" tag
          // Example implementation:
          // if (process.env.HIGHLEVEL_API_KEY) {
          //   const response = await fetch('https://rest.gohighlevel.com/v1/contacts', {
          //     method: 'POST',
          //     headers: {
          //       'Authorization': `Bearer ${process.env.HIGHLEVEL_API_KEY}`,
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({
          //       email: doc.email,
          //       tags: ['Newsletter'],
          //     }),
          //   })
          //   const data = await response.json()
          //   // Update doc with highLevelId if needed
          // }

          // TODO: Send welcome email via Resend
          // Example implementation:
          // if (process.env.RESEND_API_KEY) {
          //   await fetch('https://api.resend.com/emails', {
          //     method: 'POST',
          //     headers: {
          //       'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({
          //       from: 'newsletter@episolve.com',
          //       to: doc.email,
          //       subject: 'Welcome to Episolve Insights',
          //       html: `<p>Thanks for subscribing! Stay tuned for valuable insights on technology and business.</p>`,
          //     }),
          //   })
          // }
        }

        return doc
      },
    ],
  },
}
