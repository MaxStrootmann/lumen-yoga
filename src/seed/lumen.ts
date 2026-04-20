import config from '@payload-config'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { getPayload } from 'payload'

import {
  DEFAULT_FOOTER,
  DEFAULT_HEADER,
  DEFAULT_HOME,
  DEFAULT_SEED_MEDIA,
  DEFAULT_SITE_SETTINGS,
} from '@/lib/default-content'

type MediaDoc = {
  id: number | string
  alt?: null | string
}

type SeedMedia = (typeof DEFAULT_SEED_MEDIA)[number]

async function downloadFile(url: string, filePath: string) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to download ${url}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  await writeFile(filePath, buffer)
}

function extensionFromUrl(url: string) {
  const cleanUrl = url.split('?')[0] || url
  return path.extname(cleanUrl) || '.bin'
}

async function ensureMedia(payload: Awaited<ReturnType<typeof getPayload>>, tmpDir: string, media: SeedMedia) {
  const existing = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      alt: {
        equals: media.alt,
      },
    },
  })

  if (existing.docs[0]) {
    return existing.docs[0] as MediaDoc
  }

  const filePath = path.join(
    tmpDir,
    `${media.alt.toLowerCase().replace(/[^a-z0-9]+/g, '-')}${extensionFromUrl(media.url)}`,
  )

  await downloadFile(media.url, filePath)

  return (await payload.create({
    collection: 'media',
    data: {
      alt: media.alt,
    },
    filePath,
    overrideAccess: true,
  })) as MediaDoc
}

function mediaId(map: Map<string, MediaDoc>, alt: string) {
  return map.get(alt)?.id as number | string | undefined
}

async function main() {
  const payload = await getPayload({ config })
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'lumen-seed-'))

  try {
    const mediaMap = new Map<string, MediaDoc>()

    for (const media of DEFAULT_SEED_MEDIA) {
      mediaMap.set(media.alt, await ensureMedia(payload, tmpDir, media))
    }

    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteTitle: DEFAULT_SITE_SETTINGS.siteTitle,
        metaDescription: DEFAULT_SITE_SETTINGS.metaDescription,
        favicon: mediaId(mediaMap, DEFAULT_SITE_SETTINGS.favicon.alt),
        socialImage: mediaId(mediaMap, DEFAULT_SITE_SETTINGS.socialImage.alt),
      } as any,
      overrideAccess: true,
    })

    await payload.updateGlobal({
      slug: 'header',
      data: {
        ...DEFAULT_HEADER,
        logo: mediaId(mediaMap, DEFAULT_HEADER.logo.alt),
      } as any,
      overrideAccess: true,
    })

    await payload.updateGlobal({
      slug: 'footer',
      data: {
        ...DEFAULT_FOOTER,
        logo: mediaId(mediaMap, DEFAULT_FOOTER.logo.alt),
      } as any,
      overrideAccess: true,
    })

    await payload.updateGlobal({
      slug: 'home',
      data: {
        announcementModal: {
          ...DEFAULT_HOME.announcementModal,
          scheduleItems: [...DEFAULT_HOME.announcementModal.scheduleItems],
        },
        hero: {
          ...DEFAULT_HOME.hero,
          image: mediaId(mediaMap, DEFAULT_HOME.hero.image.alt),
          accentImage: mediaId(mediaMap, DEFAULT_HOME.hero.accentImage.alt),
        },
        intro: {
          ...DEFAULT_HOME.intro,
          image: mediaId(mediaMap, DEFAULT_HOME.intro.image.alt),
        },
        offers: {
          ...DEFAULT_HOME.offers,
          items: [...DEFAULT_HOME.offers.items],
        },
        about: {
          ...DEFAULT_HOME.about,
          image: mediaId(mediaMap, DEFAULT_HOME.about.image.alt),
          paragraphs: [...DEFAULT_HOME.about.paragraphs],
        },
        kinderyoga: {
          ...DEFAULT_HOME.kinderyoga,
          logo: mediaId(mediaMap, DEFAULT_HOME.kinderyoga.logo.alt),
          sideImage: mediaId(mediaMap, DEFAULT_HOME.kinderyoga.sideImage.alt),
          mobileImage: mediaId(mediaMap, DEFAULT_HOME.kinderyoga.mobileImage.alt),
          sections: DEFAULT_HOME.kinderyoga.sections.map((section) => ({
            ...section,
            paragraphs: [...section.paragraphs],
          })),
        },
        reviews: DEFAULT_HOME.reviews,
        contact: DEFAULT_HOME.contact,
      } as any,
      overrideAccess: true,
    })

    console.log('Lumen content seeded successfully')
  } finally {
    await rm(tmpDir, { force: true, recursive: true })
  }
}

void main()
