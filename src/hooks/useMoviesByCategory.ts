import { movieService } from '@/services/movieService'
import { useQuery } from '@tanstack/react-query'

export const useMoviesByCategory = (slug: string, page: number) =>
  useQuery({
    queryKey: ['movies', 'category', slug, page],
    queryFn: () => movieService.getMoviesByType(slug, page),
    enabled: !!slug,
  })
