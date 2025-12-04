'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-16 flex items-center justify-center overflow-hidden text-white"
      data-theme="dark"
    >
      <div className="container relative z-10 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {richText && (
            <RichText
              className="mb-8 [&_h1]:text-5xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:tracking-tight md:[&_h1]:text-6xl lg:[&_h1]:text-7xl [&_p]:text-lg [&_p]:text-white/90 md:[&_p]:text-xl [&_p]:mt-6"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      </div>
      <div className="absolute inset-0 -z-10 min-h-[90vh]">
        {media && typeof media === 'object' ? (
          <Media fill imgClassName="object-cover brightness-50" priority resource={media} />
        ) : (
          <>
            {/* Gradient mesh background */}
            <div className="absolute inset-0 bg-gradient-to-br from-episolve-navy via-episolve-blue-medium to-episolve-blue-light" />
            {/* Decorative gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-episolve-yellow/20 blur-3xl"
                style={{ animation: 'pulse 8s ease-in-out infinite' }}
              />
              <div
                className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-episolve-blue-light/30 blur-3xl"
                style={{ animation: 'pulse 10s ease-in-out infinite' }}
              />
              <div
                className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"
                style={{ animation: 'pulse 12s ease-in-out infinite' }}
              />
            </div>
            {/* Subtle grid pattern */}
            <svg
              className="absolute inset-0 h-full w-full opacity-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="hero-grid"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 32V.5H32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>
          </>
        )}
      </div>
    </div>
  )
}
