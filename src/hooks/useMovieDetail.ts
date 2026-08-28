import { movieService } from '@/services/movieService'
import { useQuery } from '@tanstack/react-query'

export const useMovieDetail = (slug: string) =>
  useQuery({
    queryKey: ['movies', 'detail', slug],
    queryFn: () => movieService.getMovieDetail(slug),
    enabled: !!slug,
  })
