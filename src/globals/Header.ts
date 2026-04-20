import type { GlobalConfig } from 'payload'

const navItemFields = [
  { name: 'label', type: 'text', required: true },
  { name: 'link', type: 'text', required: true },
  { name: 'highlightAsButton', type: 'checkbox', defaultValue: false },
] as const

export const Header: GlobalConfig = {
  slug: 'header',
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
