import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading (optional)',
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Featured Testimonials Only', value: 'featured' },
        { label: 'All Testimonials', value: 'all' },
        { label: 'Select Specific', value: 'manual' },
      ],
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'manual',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      admin: {
        description: 'Maximum number of testimonials to display',
        condition: (_, siblingData) => siblingData?.source !== 'manual',
      },
    },
  ],
}
