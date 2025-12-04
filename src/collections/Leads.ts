import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'source', 'status', 'createdAt'],
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Website Contact Form', value: 'contact_form' },
        { label: 'Service Page', value: 'service_page' },
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'HighLevel', value: 'highlevel' },
        { label: 'Manual', value: 'manual' },
      ],
      defaultValue: 'contact_form',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Converted', value: 'converted' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'new',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
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
          console.log('🔔 New lead received:', doc.email)

          // TODO: Integrate with HighLevel API
          // Example implementation:
          // if (process.env.HIGHLEVEL_API_KEY) {
          //   const response = await fetch('https://rest.gohighlevel.com/v1/contacts', {
          //     method: 'POST',
          //     headers: {
          //       'Authorization': `Bearer ${process.env.HIGHLEVEL_API_KEY}`,
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({
          //       firstName: doc.name.split(' ')[0],
          //       lastName: doc.name.split(' ').slice(1).join(' '),
          //       email: doc.email,
          //       phone: doc.phone,
          //       companyName: doc.company,
          //       source: doc.source,
          //       customField: { message: doc.message },
          //     }),
          //   })
          //   const data = await response.json()
          //   // Update doc with highLevelId if needed
          // }

          // TODO: Send notification email via Resend
          // Example implementation:
          // if (process.env.RESEND_API_KEY) {
          //   await fetch('https://api.resend.com/emails', {
          //     method: 'POST',
          //     headers: {
          //       'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({
          //       from: 'noreply@episolve.com',
          //       to: 'team@episolve.com',
          //       subject: `New Lead: ${doc.name}`,
          //       html: `<p><strong>Name:</strong> ${doc.name}</p>
          //              <p><strong>Email:</strong> ${doc.email}</p>
          //              <p><strong>Message:</strong> ${doc.message}</p>`,
          //     }),
          //   })
          // }
        }

        return doc
      },
    ],
  },
}
