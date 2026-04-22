import type { GlobalConfig } from 'payload'

import { getPreviewURL } from '@/lib/live-preview'

const navItemFields = [
  { name: 'label', type: 'text', required: true },
  { name: 'link', type: 'text', required: true },
  { name: 'highlightAsButton', type: 'checkbox', defaultValue: false },
] as const

export const Header: GlobalConfig = {
  slug: 'header',
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
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'instagramUrl', type: 'text' },
    { name: 'facebookUrl', type: 'text' },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [...navItemFields],
    },
  ],
}
