import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container py-16 md:py-20">
      <div className="max-w-3xl">
        {children ||
          (richText && (
            <RichText
              className="[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mb-4 md:[&_h1]:text-5xl [&_p]:text-lg [&_p]:text-muted-foreground [&_p]:leading-relaxed"
              data={richText}
              enableGutter={false}
            />
          ))}
      </div>
    </div>
  )
}
