import { movieService } from '@/services/movieService'
import { useQuery } from '@tanstack/react-query'

export const useSearchMovies = (keyword: string, page: number) =>
  useQuery({
    queryKey: ['movies', 'search', keyword, page],
    queryFn: () => movieService.searchMovies(keyword, page),
    enabled: keyword.trim().length > 0,
  })
