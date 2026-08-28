import { movieService } from '@/services/movieService'
import { useQuery } from '@tanstack/react-query'

export const useMoviesByGenre = (slug: string, page: number) =>
  useQuery({
    queryKey: ['movies', 'genre', slug, page],
    queryFn: () => movieService.getMoviesByCategory(slug, page),
    enabled: !!slug,
  })
