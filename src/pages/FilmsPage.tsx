import { MainLayout } from '@/components/layout/MainLayout'
import { MovieListPage } from '@/components/movie/MovieListPage'
import { useLatestMovies, useMoviesByCategory } from '@/hooks/useMovies'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const TYPE_LABELS: Record<string, string> = {
  'phim-le': 'Phim lẻ',
  'phim-bo': 'Phim bộ',
  'tv-shows': 'TV Show',
  'hoat-hinh': 'Hoạt hình',
  'phim-moi-cap-nhat': 'Phim mới cập nhật',
}

const FilmsContent = ({ slug }: { slug: string }) => {
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(() => Number(searchParams.get('page') ?? 1))
  const isLatest = slug === 'phim-moi-cap-nhat'
  const latestQuery = useLatestMovies(isLatest ? page : 0)
  const categoryQuery = useMoviesByCategory(isLatest ? '' : slug, isLatest ? 0 : page)
  const queryResult = isLatest ? latestQuery : categoryQuery

  return (
    <MovieListPage
      title={TYPE_LABELS[slug] ?? slug}
      queryResult={queryResult}
      page={page}
      onPageChange={setPage}
    />
  )
}

export const FilmsPage = () => {
  const { slug = 'phim-moi-cap-nhat' } = useParams()
  return <MainLayout><FilmsContent slug={slug} /></MainLayout>
}
