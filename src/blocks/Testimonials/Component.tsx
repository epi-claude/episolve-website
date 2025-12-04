import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { TestimonialsBlock as TestimonialsBlockType, Testimonial } from '@/payload-types'

export const TestimonialsBlock: React.FC<TestimonialsBlockType> = async ({
  heading,
  source = 'featured',
  testimonials: manualTestimonials,
  limit = 3,
}) => {
  const payload = await getPayload({ config })

  let testimonials: Testimonial[] = []

  if (source === 'manual' && manualTestimonials) {
    // Use manually selected testimonials
    testimonials = manualTestimonials.filter((t): t is Testimonial => typeof t !== 'string')
  } else {
    // Fetch from collection
    const query: any = {
      collection: 'testimonials',
      limit,
      sort: 'order',
    }

    if (source === 'featured') {
      query.where = {
        featured: {
          equals: true,
        },
      }
    }

    const result = await payload.find(query)
    testimonials = result.docs
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <div className="container my-16">
      {heading && <h2 className="mb-12 text-center text-3xl font-bold">{heading}</h2>}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={typeof testimonial === 'string' ? testimonial : testimonial.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <svg
              className="mb-4 h-8 w-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="mb-4 text-gray-700">{testimonial.quote}</p>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="font-semibold text-gray-900">{testimonial.clientName}</p>
              {testimonial.clientRole && (
                <p className="text-sm text-gray-600">{testimonial.clientRole}</p>
              )}
              {testimonial.clientCompany && (
                <p className="text-sm text-gray-600">{testimonial.clientCompany}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
