// Category group item (from detail response's nested category structure)
export interface CategoryItem {
  id: string
  name: string
  slug?: string
}

export interface CategoryGroup {
  group: { id: string; name: string }
  list: CategoryItem[]
}

// Flat category/country used for navigation
export interface NavCategory {
  id: string
  name: string
  slug: string
}

// Movie in list responses
export interface Movie {
  id: string
  slug: string
  name: string
  original_name: string
  thumb_url: string
  poster_url: string
  year: string | null
  quality: string | null
  language: string | null
  total_episodes: number | null
  current_episode: string | null
  time: string | null
  director: string | null
  casts: string | null
  description: string | null
}

// Resolved category groups extracted from detail
export interface MovieCategories {
  format: CategoryItem[]   // Định dạng
  genres: CategoryItem[]   // Thể loại
  years: CategoryItem[]    // Năm
  countries: CategoryItem[]  // Quốc gia
}

export interface Episode {
  name: string
  slug: string
  embed: string
}

export interface EpisodeServer {
  server_name: string
  items: Episode[]
}

export interface MovieDetail extends Movie {
  episodes: EpisodeServer[]
  categories: MovieCategories
}

export interface Pagination {
  current_page: number
  total_page: number
  total_items: number
  items_per_page: number
}

export interface ApiListResponse {
  status: string
  items: Movie[]
  paginate: Pagination
  cat?: { name: string; title: string; slug: string }
}

export interface ApiDetailResponse {
  status: string
  movie: MovieDetail
}

// localStorage
export interface FavoriteMovie {
  id: string
  slug: string
  name: string
  poster_url: string
  thumb_url: string
  year: string | null
  addedAt: string
}

export interface WatchHistory {
  movieSlug: string
  movieName: string
  episodeSlug: string
  episodeName: string
  serverIndex: number
  serverName: string
  poster?: string
  watchedAt: string
}
