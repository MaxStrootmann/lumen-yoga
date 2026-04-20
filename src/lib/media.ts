export type MediaLike =
  | {
      alt?: null | string
      height?: null | number
      url?: null | string
      width?: null | number
    }
  | null
  | string
  | undefined

export function getMediaUrl(media: MediaLike) {
  if (!media) return undefined
  if (typeof media === 'string') return media
  return media.url || undefined
}

export function getMediaAlt(media: MediaLike, fallback: string) {
  if (!media || typeof media === 'string') return fallback
  return media.alt || fallback
}

export function getMediaDimensions(media: MediaLike, fallbackWidth: number, fallbackHeight: number) {
  if (!media || typeof media === 'string') {
    return { height: fallbackHeight, width: fallbackWidth }
  }

  return {
    height: media.height || fallbackHeight,
    width: media.width || fallbackWidth,
  }
}
