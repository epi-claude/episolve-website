import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        <svg className="absolute inset-0 h-full w-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="medium-hero-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medium-hero-pattern)" />
        </svg>
      </div>

      <div className="container py-12 md:py-16">
        {richText && (
          <RichText
            className="mb-8 max-w-3xl [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight md:[&_h1]:text-5xl [&_p]:text-lg [&_p]:text-muted-foreground"
            data={richText}
            enableGutter={false}
          />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="mb-12 flex flex-wrap gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} size="lg" />
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="container">
        {media && typeof media === 'object' ? (
          <div className="rounded-2xl border border-border bg-card p-2 shadow-lg">
            <Media className="rounded-xl overflow-hidden" imgClassName="" priority resource={media} />
            {media?.caption && (
              <div className="mt-4 px-2">
                <RichText className="text-sm text-muted-foreground" data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-gradient-to-br from-episolve-navy/5 to-episolve-blue-light/5 p-16 text-center">
            <div className="mx-auto max-w-2xl">
              <div className="mb-4 text-6xl">✨</div>
              <p className="text-muted-foreground">Add an image to enhance this section</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
