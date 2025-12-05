import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { MatomoAnalytics } from '@/components/Analytics/Matomo'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Force all pages to render dynamically to avoid database connection during build
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <MatomoAnalytics />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Episolve LLC - Technology Solutions for Business Problems',
    template: '%s | Episolve LLC',
  },
  description: 'Episolve LLC provides innovative technology solutions for complex business problems. Expert consulting, custom software development, and strategic technology guidance.',
  keywords: ['technology solutions', 'business consulting', 'software development', 'IT consulting', 'Episolve'],
  authors: [{ name: 'Episolve LLC' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    ...mergeOpenGraph(),
    siteName: 'Episolve LLC',
    title: 'Episolve LLC - Technology Solutions for Business Problems',
    description: 'Innovative technology solutions for complex business problems',
    images: [
      {
        url: '/branding/logos/episolve-logo.png',
        width: 1200,
        height: 630,
        alt: 'Episolve LLC - Technology Solutions for Business Problems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@episolve',
    creator: '@episolve',
    title: 'Episolve LLC - Technology Solutions for Business Problems',
    description: 'Innovative technology solutions for complex business problems',
    images: ['/branding/logos/episolve-logo.png'],
  },
}
