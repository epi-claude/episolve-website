import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { BackgroundPattern } from '@/components/BackgroundPattern'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="relative my-20">
      <div className="container">
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-6 lg:gap-8">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <div
                  className={cn(
                    `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                    'group relative overflow-hidden rounded-xl bg-card p-8 shadow-sm transition-all hover:shadow-md border border-border',
                    {
                      'md:col-span-2': size !== 'full',
                    },
                  )}
                  key={index}
                >
                  {/* Subtle pattern on hover */}
                  <BackgroundPattern
                    pattern="dots"
                    className="opacity-0 transition-opacity group-hover:opacity-5"
                  />

                  <div className="relative z-10">
                    {richText && (
                      <RichText
                        className="prose-headings:text-foreground prose-p:text-muted-foreground"
                        data={richText}
                        enableGutter={false}
                      />
                    )}

                    {enableLink && (
                      <div className="mt-6">
                        <CMSLink {...link} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
