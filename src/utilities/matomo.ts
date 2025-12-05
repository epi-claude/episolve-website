/**
 * Matomo Analytics Utilities
 * Use these functions to track custom events throughout the application
 */

export const trackEvent = (category: string, action: string, name?: string, value?: number) => {
  if (typeof window !== 'undefined' && window._paq) {
    window._paq.push(['trackEvent', category, action, name, value])
  }
}

// Predefined event trackers for common actions
export const matomoEvents = {
  // Form submissions
  contactFormSubmit: () => trackEvent('Form', 'Submit', 'Contact Form'),
  newsletterSignup: () => trackEvent('Form', 'Submit', 'Newsletter Signup'),

  // CTA interactions
  bookConsultation: (location: string) => trackEvent('CTA', 'Click', `Book Consultation - ${location}`),

  // Service interactions
  viewService: (serviceName: string) => trackEvent('Service', 'View', serviceName),

  // Content engagement
  readBlogPost: (postTitle: string) => trackEvent('Content', 'Read', postTitle),

  // Downloads
  downloadResource: (resourceName: string) => trackEvent('Download', 'Click', resourceName),

  // External links
  externalLink: (url: string) => trackEvent('External', 'Click', url),
}

// Track outbound links automatically
export const trackOutboundLink = (url: string) => {
  if (typeof window !== 'undefined' && window._paq) {
    window._paq.push(['trackLink', url, 'link'])
  }
}

// Track downloads
export const trackDownload = (url: string) => {
  if (typeof window !== 'undefined' && window._paq) {
    window._paq.push(['trackLink', url, 'download'])
  }
}
