import { SafeImage } from '@/components/common/SafeImage'
import type { Movie } from '@/types'
import { motion } from 'framer-motion'
import { Heart, Info, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface MovieHeroProps {
  movie: Movie
  onFavoriteToggle?: () => void
  isFavorite?: boolean
}

export const MovieHero = ({ movie, onFavoriteToggle, isFavorite }: MovieHeroProps) => {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      <SafeImage src={movie.thumb_url || movie.poster_url} alt={movie.name} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 h-full flex flex-col justify-end pb-16 px-4 md:px-8 lg:px-16 max-w-2xl"
      >
        <div className="flex items-center gap-2 mb-3">
          {movie.quality && (
            <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">{movie.quality}</span>
          )}
          {movie.language && (
            <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded">{movie.language}</span>
          )}
          {movie.year && <span className="text-gray-400 text-sm">{movie.year}</span>}
        </div>

        <h1 title={movie.name} className="text-3xl md:text-5xl font-bold text-white mb-1 line-clamp-2">{movie.name}</h1>
        {movie.original_name && <p className="text-gray-400 text-lg mb-4">{movie.original_name}</p>}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate(`/movie/${movie.slug}/watch`)}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Play className="w-5 h-5 fill-white" />
            Xem ngay
          </button>
          <button
            onClick={() => navigate(`/movie/${movie.slug}`)}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-colors border border-white/20"
          >
            <Info className="w-5 h-5" />
            Chi tiết
          </button>
          {onFavoriteToggle && (
            <button
              onClick={onFavoriteToggle}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg backdrop-blur-sm transition-colors border ${isFavorite ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-400' : ''}`} />
              {isFavorite ? 'Đã thích' : 'Yêu thích'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
