import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'siteTitle', type: 'text', required: true },
    { name: 'metaDescription', type: 'textarea', required: true },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    { name: 'socialImage', type: 'upload', relationTo: 'media' },
  ],
}
