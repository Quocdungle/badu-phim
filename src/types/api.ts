// Spec-compliant API types (re-exported with canonical names)
export type {
  Movie as MovieItem,
  Episode as EpisodeItem,
  EpisodeServer,
  Pagination as Paginate,
  ApiListResponse as ListResponse,
  ApiDetailResponse as DetailResponse,
  MovieDetail,
} from './index'

export interface CategoryGroup {
  id: string
  name: string
}

export interface CategoryListItem {
  id: string
  name: string
}

export interface MovieCategory {
  [key: string]: {
    group?: CategoryGroup
    list?: CategoryListItem[]
  }
}

export interface CategoryFilter {
  name: string
  title: string
  slug: string
}
