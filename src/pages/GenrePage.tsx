import { MainLayout } from '@/components/layout/MainLayout'
import { MovieListPage } from '@/components/movie/MovieListPage'
import { useMoviesByGenre } from '@/hooks/useMovies'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const GenreContent = ({ slug }: { slug: string }) => {
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(() => Number(searchParams.get('page') ?? 1))
  const queryResult = useMoviesByGenre(slug, page)
  return <MovieListPage title="Thể loại" queryResult={queryResult} page={page} onPageChange={setPage} />
}

export const GenrePage = () => {
  const { slug = '' } = useParams()
  return <MainLayout><GenreContent slug={slug} /></MainLayout>
}
