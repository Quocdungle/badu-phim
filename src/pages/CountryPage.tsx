import { MainLayout } from '@/components/layout/MainLayout'
import { MovieListPage } from '@/components/movie/MovieListPage'
import { useMoviesByCountry } from '@/hooks/useMovies'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const CountryContent = ({ slug }: { slug: string }) => {
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(() => Number(searchParams.get('page') ?? 1))
  const queryResult = useMoviesByCountry(slug, page)
  return <MovieListPage title="Quốc gia" queryResult={queryResult} page={page} onPageChange={setPage} />
}

export const CountryPage = () => {
  const { slug = '' } = useParams()
  return <MainLayout><CountryContent slug={slug} /></MainLayout>
}
