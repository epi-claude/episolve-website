import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading (optional)',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 2,
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
          admin: {
            description: 'e.g., "15+", "100%", "$2M+"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
          admin: {
            description: 'e.g., "Years Experience", "Client Satisfaction"',
          },
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
  ],
}
