'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-8 items-center">
      <div className="hidden md:flex gap-6 items-center">
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            />
          )
        })}
      </div>
      <Link
        href="/search"
        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="h-4 w-4 text-foreground" />
      </Link>
    </nav>
  )
}
