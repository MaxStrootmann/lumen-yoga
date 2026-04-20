import type { GlobalConfig } from 'payload'

const navItemFields = [
  { name: 'label', type: 'text', required: true },
  { name: 'link', type: 'text', required: true },
  { name: 'highlightAsButton', type: 'checkbox', defaultValue: false },
] as const

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'navItems',
      type: 'array',
      fields: [...navItemFields],
    },
    { name: 'instagramUrl', type: 'text' },
    { name: 'facebookUrl', type: 'text' },
    { name: 'termsUrl', type: 'text' },
    { name: 'creditLabel', type: 'text' },
    { name: 'creditUrl', type: 'text' },
  ],
}
