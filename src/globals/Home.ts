import type { GlobalConfig } from 'payload'

const paragraphFields = [{ name: 'text', type: 'textarea', required: true }] as const

export const Home: GlobalConfig = {
  slug: 'home',
  fields: [
    {
      name: 'announcementModal',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'title', type: 'text' },
        { name: 'intro', type: 'textarea' },
        { name: 'scheduleTitle', type: 'text' },
        {
          name: 'scheduleItems',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'signupTitle', type: 'text' },
        { name: 'signupText', type: 'textarea' },
        { name: 'closingText', type: 'textarea' },
        { name: 'signature', type: 'text' },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text' },
        { name: 'locationLabel', type: 'text' },
        { name: 'locationUrl', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'primaryCTA',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
        {
          name: 'secondaryCTA',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
        { name: 'quote', type: 'text' },
        { name: 'accentImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'intro',
      type: 'group',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'quote', type: 'text' },
      ],
    },
    {
      name: 'offers',
      type: 'group',
      fields: [
        { name: 'sectionTitle', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'color',
              type: 'select',
              required: true,
              options: ['yellow', 'magenta', 'purple', 'blue', 'green'],
            },
            { name: 'title', type: 'text', required: true },
            { name: 'time', type: 'text', required: true },
            { name: 'body', type: 'textarea', required: true },
            { name: 'buttonLabel', type: 'text', required: true },
            { name: 'buttonUrl', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'heading', type: 'text' },
        { name: 'paragraphs', type: 'array', fields: [...paragraphFields] },
        { name: 'instagramLabel', type: 'text' },
        { name: 'instagramUrl', type: 'text' },
      ],
    },
    {
      name: 'kinderyoga',
      type: 'group',
      fields: [
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'sideImage', type: 'upload', relationTo: 'media' },
        { name: 'mobileImage', type: 'upload', relationTo: 'media' },
        { name: 'mobileQuote', type: 'text' },
        {
          name: 'sections',
          type: 'array',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'paragraphs', type: 'array', fields: [...paragraphFields] },
          ],
        },
      ],
    },
    {
      name: 'reviews',
      type: 'group',
      fields: [{ name: 'heading', type: 'text' }],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'locationLabel', type: 'text' },
        { name: 'locationUrl', type: 'text' },
      ],
    },
  ],
}
