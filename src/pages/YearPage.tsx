import { MainLayout } from '@/components/layout/MainLayout'
import { MovieListPage } from '@/components/movie/MovieListPage'
import { useMoviesByYear } from '@/hooks/useMovies'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const YearContent = ({ year }: { year: number }) => {
  const [page, setPage] = useState(1)
  const queryResult = useMoviesByYear(year, page)
  return <MovieListPage title={`Phim năm ${year}`} queryResult={queryResult} page={page} onPageChange={setPage} />
}

export const YearPage = () => {
  const { year = '' } = useParams()
  return <MainLayout><YearContent year={Number(year)} /></MainLayout>
}
