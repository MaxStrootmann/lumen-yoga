import type { GlobalConfig } from 'payload'

import { getPreviewURL } from '@/lib/live-preview'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    livePreview: {
      url: ({ req }) => getPreviewURL(req),
    },
    preview: (_, { req }) => getPreviewURL(req),
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    { name: 'siteTitle', type: 'text', required: true },
    { name: 'metaDescription', type: 'textarea', required: true },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    { name: 'socialImage', type: 'upload', relationTo: 'media' },
  ],
}
