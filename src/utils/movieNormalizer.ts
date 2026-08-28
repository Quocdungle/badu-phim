// Spec-compliant normalized UI model
export interface NormalizedMovie {
  id: string
  slug: string
  title: string
  originalTitle?: string
  poster?: string
  thumbnail?: string
  description?: string
  year?: string
  quality?: string
  language?: string
  currentEpisode?: string
  totalEpisodes?: number
  time?: string
  director?: string
  casts?: string
}

export { normalizeListResponse, normalizeDetailResponse } from './normalizers'
