import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container my-20">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-episolve-navy to-episolve-blue-medium px-8 py-12 md:px-12 md:py-16 lg:px-16 shadow-lg">
        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            {richText && (
              <RichText
                className="mb-0 [&_h2]:text-white [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-3 [&_p]:text-white/90 [&_p]:text-lg"
                data={richText}
                enableGutter={false}
              />
            )}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row md:flex-col lg:flex-row">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...link} />
            })}
          </div>
        </div>
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-episolve-yellow/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-episolve-blue-light/10 blur-3xl" />
      </div>
    </div>
  )
}
