'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function MatomoAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize Matomo
    const _paq = (window._paq = window._paq || [])

    // Track initial page view
    _paq.push(['trackPageView'])
    _paq.push(['enableLinkTracking'])
    _paq.push(['setTrackerUrl', 'https://momo.episolve.net/matomo.php'])
    _paq.push(['setSiteId', '9'])

    // Load Matomo tracking script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://momo.episolve.net/matomo.js'
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    // Track page views on route changes
    const _paq = window._paq || []
    _paq.push(['setCustomUrl', window.location.href])
    _paq.push(['setDocumentTitle', document.title])
    _paq.push(['trackPageView'])
  }, [pathname, searchParams])

  return null
}

// Extend window type for TypeScript
declare global {
  interface Window {
    _paq: any[]
  }
}
