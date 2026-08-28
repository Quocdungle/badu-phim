import type {
  ApiDetailResponse,
  ApiListResponse,
  CategoryGroup,
  Movie,
  MovieCategories,
  MovieDetail,
} from '@/types'

function normalizeMovie(raw: Record<string, unknown>): Movie {
  return {
    id: String(raw.id ?? ''),
    slug: String(raw.slug ?? ''),
    name: String(raw.name ?? ''),
    original_name: String(raw.original_name ?? ''),
    thumb_url: String(raw.thumb_url ?? ''),
    poster_url: String(raw.poster_url ?? ''),
    year: (raw.year as string) ?? null,
    quality: (raw.quality as string) ?? null,
    language: (raw.language as string) ?? null,
    total_episodes: (raw.total_episodes as number) ?? null,
    current_episode: (raw.current_episode as string) ?? null,
    time: (raw.time as string) ?? null,
    director: (raw.director as string) ?? null,
    casts: (raw.casts as string) ?? null,
    description: (raw.description as string) ?? null,
  }
}

function normalizeCategories(raw: unknown): MovieCategories {
  const result: MovieCategories = { format: [], genres: [], years: [], countries: [] }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return result

  const categoryMap: Record<string, keyof MovieCategories> = {
    'Định dạng': 'format',
    'Thể loại': 'genres',
    'Năm': 'years',
    'Quốc gia': 'countries',
  }

  for (const value of Object.values(raw as Record<string, unknown>)) {
    const group = value as CategoryGroup
    if (!group?.group?.name) continue
    const key = categoryMap[group.group.name]
    if (key && Array.isArray(group.list)) {
      result[key] = group.list.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug ?? '',
      }))
    }
  }
  return result
}

function normalizeMovieDetail(raw: Record<string, unknown>): MovieDetail {
  const rawEpisodes = Array.isArray(raw.episodes) ? raw.episodes : []
  const episodes = rawEpisodes.map((server: Record<string, unknown>) => ({
    server_name: String(server.server_name ?? ''),
    items: Array.isArray(server.items)
      ? server.items.map((ep: Record<string, unknown>) => ({
          name: String(ep.name ?? ''),
          slug: String(ep.slug ?? ''),
          embed: String(ep.embed ?? ''),
        }))
      : [],
  }))

  return {
    ...normalizeMovie(raw),
    episodes,
    categories: normalizeCategories(raw.category),
  }
}

function sortMoviesNewestFirst(items: Movie[]): Movie[] {
  return [...items].sort((a, b) => {
    const yearDiff = (Number(b.year) || 0) - (Number(a.year) || 0)
    if (yearDiff !== 0) return yearDiff
    // fall back to comparing "time" (last updated) when years match/are missing
    const timeA = a.time ? Date.parse(a.time) : NaN
    const timeB = b.time ? Date.parse(b.time) : NaN
    if (!Number.isNaN(timeA) && !Number.isNaN(timeB)) return timeB - timeA
    return 0
  })
}

export function normalizeListResponse(data: unknown): ApiListResponse {
  const d = data as Record<string, unknown>
  const paginate = (d.paginate ?? {}) as Record<string, unknown>
  const items = Array.isArray(d.items)
    ? sortMoviesNewestFirst((d.items as Record<string, unknown>[]).map(normalizeMovie))
    : []
  return {
    status: String(d.status ?? ''),
    items,
    cat: d.cat as ApiListResponse['cat'],
    paginate: {
      current_page: Number(paginate.current_page ?? 1),
      total_page: Number(paginate.total_page ?? 1),
      total_items: Number(paginate.total_items ?? 0),
      items_per_page: Number(paginate.items_per_page ?? 10),
    },
  }
}

export function normalizeDetailResponse(data: unknown): ApiDetailResponse {
  const d = data as Record<string, unknown>
  return {
    status: String(d.status ?? ''),
    movie: normalizeMovieDetail((d.movie ?? {}) as Record<string, unknown>),
  }
}
