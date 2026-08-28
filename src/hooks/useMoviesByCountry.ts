import { movieService } from '@/services/movieService'
import { useQuery } from '@tanstack/react-query'

export const useMoviesByCountry = (slug: string, page: number) =>
  useQuery({
    queryKey: ['movies', 'country', slug, page],
    queryFn: () => movieService.getMoviesByCountry(slug, page),
    enabled: !!slug,
  })
