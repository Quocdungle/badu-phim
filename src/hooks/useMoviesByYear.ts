import { movieService } from '@/services/movieService'
import { useQuery } from '@tanstack/react-query'

export const useMoviesByYear = (year: number, page: number) =>
  useQuery({
    queryKey: ['movies', 'year', year, page],
    queryFn: () => movieService.getMoviesByYear(year, page),
    enabled: !!year,
  })
