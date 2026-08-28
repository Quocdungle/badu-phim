import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs))

export const FALLBACK_IMAGE = '/placeholder.svg'

export const formatImageUrl = (url: string | null | undefined): string => {
  if (!url) return FALLBACK_IMAGE
  if (url.startsWith('http')) return url
  return `https://phim.nguonc.com${url}`
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

export const getMovieTypeLabel = (type: string): string => {
  const map: Record<string, string> = {
    'phim-le': 'Phim lẻ',
    'phim-bo': 'Phim bộ',
    'tv-shows': 'TV Show',
    'hoat-hinh': 'Hoạt hình',
  }
  return map[type] ?? type
}
