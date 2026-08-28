import { movieService } from '@/services/movieService'
import { useQuery } from '@tanstack/react-query'

export const useLatestMovies = (page: number) =>
  useQuery({
    queryKey: ['movies', 'latest', page],
    queryFn: () => movieService.getLatestMovies(page),
  })
