import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getPayloadClient = cache(async () => getPayload({ config }))

export async function getGlobalOrFallback<T>(
  slug: 'footer' | 'header' | 'home' | 'site-settings',
  fallback: T,
  depth = 2,
): Promise<T> {
  try {
    const payload = await getPayloadClient()
    return (await payload.findGlobal({
      slug,
      depth,
      overrideAccess: true,
    })) as T
  } catch {
    return fallback
  }
}
