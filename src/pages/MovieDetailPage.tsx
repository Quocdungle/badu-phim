import { ErrorState } from '@/components/common/ErrorState'
import { Loading } from '@/components/common/Loading'
import { SafeImage } from '@/components/common/SafeImage'
import { MainLayout } from '@/components/layout/MainLayout'
import { EpisodeList } from '@/components/movie/EpisodeList'
import { MovieInfo } from '@/components/movie/MovieInfo'
import { useMovieDetail } from '@/hooks/useMovies'
import { useFavoritesStore } from '@/stores/favoritesStore'
import type { FavoriteMovie } from '@/types'
import { ChevronDown, ChevronUp, Heart, Play } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const DESCRIPTION_EXPAND_THRESHOLD = 220

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim()

export const MovieDetailPage = () => {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useMovieDetail(slug)
  const [expanded, setExpanded] = useState(false)
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()

  const movie = data?.movie

  const handleFavoriteToggle = () => {
    if (!movie) return
    if (isFavorite(movie.slug)) {
      removeFavorite(movie.slug)
    } else {
      const fav: FavoriteMovie = {
        id: movie.id,
        slug: movie.slug,
        name: movie.name,
        poster_url: movie.poster_url,
        thumb_url: movie.thumb_url,
        year: movie.year,
        addedAt: new Date().toISOString(),
      }
      addFavorite(fav)
    }
  }

  if (isLoading) return <MainLayout><div className="pt-20 flex justify-center"><Loading size="lg" className="mt-16" /></div></MainLayout>
  if (isError || !movie) return <MainLayout><div className="pt-20"><ErrorState onRetry={() => refetch()} /></div></MainLayout>

  const favorited = isFavorite(movie.slug)
  const isDescriptionLong = !!movie.description && stripHtml(movie.description).length > DESCRIPTION_EXPAND_THRESHOLD

  return (
    <MainLayout>
      <div className="relative w-full h-[50vh] overflow-hidden">
        <SafeImage src={movie.thumb_url || movie.poster_url} alt={movie.name} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/60 to-black/30" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 -mt-32 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-48 md:w-56 mx-auto md:mx-0">
            <SafeImage src={movie.poster_url || movie.thumb_url} alt={movie.name} objectPosition="top" className="w-full aspect-[2/3] rounded-xl shadow-2xl" />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">{movie.name}</h1>
            {movie.original_name && <p className="text-gray-400 text-lg mb-4">{movie.original_name}</p>}

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.quality && <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">{movie.quality}</span>}
              {movie.language && <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded">{movie.language}</span>}
              {movie.year && <span className="px-2 py-0.5 bg-white/10 text-gray-300 text-xs rounded">{movie.year}</span>}
              {movie.current_episode && <span className="px-2 py-0.5 bg-green-600/30 text-green-400 text-xs rounded">{movie.current_episode}</span>}
            </div>

            <div className="mb-6">
              <MovieInfo movie={movie} />
            </div>

            {movie.description && (
              <div className="mb-6">
                <div
                  className={`text-gray-300 text-sm leading-relaxed ${!expanded && isDescriptionLong ? 'line-clamp-3' : ''}`}
                  dangerouslySetInnerHTML={{ __html: movie.description }}
                />
                {isDescriptionLong && (
                  <button
                    onClick={() => setExpanded((e) => !e)}
                    className="flex items-center gap-1 mt-2 text-red-400 text-sm hover:text-red-300 transition-colors"
                  >
                    {expanded ? <><ChevronUp className="w-4 h-4" /> Thu gọn</> : <><ChevronDown className="w-4 h-4" /> Xem thêm</>}
                  </button>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Link to={`/movie/${movie.slug}/watch`} className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                <Play className="w-5 h-5 fill-white" />
                Xem phim
              </Link>
              <button
                onClick={handleFavoriteToggle}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-colors border ${favorited ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'}`}
              >
                <Heart className={`w-5 h-5 ${favorited ? 'fill-red-400' : ''}`} />
                {favorited ? 'Đã thích' : 'Yêu thích'}
              </button>
            </div>
          </div>
        </div>

        {movie.episodes.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-white mb-3">Danh sách tập</h2>
            <EpisodeList
              servers={movie.episodes}
              onSelect={(serverIndex, episodeSlug) =>
                navigate(`/movie/${movie.slug}/watch?episode=${episodeSlug}&server=${serverIndex}`)
              }
            />
          </div>
        )}
      </div>
    </MainLayout>
  )
}

