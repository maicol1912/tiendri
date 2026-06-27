export function isMediaToken(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.startsWith('media_')
}

export function isCdnUrl(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.startsWith('http')
}

export function stripMediaPrefix(mediaId: string): string {
  return mediaId.startsWith('media_') ? mediaId.slice(6) : mediaId
}

export function extractMediaTokens(obj: unknown): string[] {
  const tokens: string[] = []
  function walk(val: unknown) {
    if (typeof val === 'string' && val.startsWith('media_')) {
      tokens.push(val)
    } else if (Array.isArray(val)) {
      val.forEach(walk)
    } else if (val && typeof val === 'object') {
      Object.values(val).forEach(walk)
    }
  }
  walk(obj)
  return [...new Set(tokens)]
}
