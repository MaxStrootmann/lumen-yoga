import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from '@/collections/Media'
import { Users } from '@/collections/Users'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { Home } from '@/globals/Home'
import { SiteSettings } from '@/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProduction = process.env.NODE_ENV === 'production'

function getPublicS3FileURL(filename: string, prefix?: string) {
  const bucket = process.env.S3_BUCKET
  const region = process.env.S3_REGION || 'eu-west-1'

  if (!bucket) {
    return `/api/media/file/${encodeURIComponent(filename)}`
  }

  const key = [prefix, filename].filter(Boolean).join('/')
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
}

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [Users, Media],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: process.env.PAYLOAD_DATABASE_PUSH === 'true' || !isProduction,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  editor: lexicalEditor(),
  globals: [Header, Footer, SiteSettings, Home],
  plugins: [
    s3Storage({
      bucket: process.env.S3_BUCKET || '',
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => getPublicS3FileURL(filename, prefix),
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
          sessionToken: process.env.S3_SESSION_TOKEN,
        },
        region: process.env.S3_REGION || 'eu-west-1',
      },
      enabled: Boolean(
        process.env.S3_BUCKET &&
          process.env.S3_REGION &&
          process.env.S3_ACCESS_KEY_ID &&
          process.env.S3_SECRET_ACCESS_KEY,
      ),
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
