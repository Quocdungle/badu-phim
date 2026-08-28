import { SafeImage } from '@/components/common/SafeImage'
import type { Movie } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Info, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface HeroSliderProps {
  movies: Movie[]
  isFavorite?: (slug: string) => boolean
  onFavoriteToggle?: (movie: Movie) => void
  autoPlayMs?: number
}

export const HeroSlider = ({ movies, isFavorite, onFavoriteToggle, autoPlayMs = 6000 }: HeroSliderProps) => {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const slides = movies.slice(0, 6)
  const movie = slides[index]

  useEffect(() => {
    if (paused || slides.length <= 1) return
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), autoPlayMs)
    return () => clearInterval(timerRef.current)
  }, [paused, slides.length, autoPlayMs])

  useEffect(() => {
    if (index >= slides.length) setIndex(0)
  }, [slides.length, index])

  if (!movie) return null

  const goTo = (next: number) => setIndex((next + slides.length) % slides.length)

  return (
    <div
      className="relative w-full h-[70vh] min-h-[500px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={movie.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <SafeImage src={movie.thumb_url || movie.poster_url} alt={movie.name} className="absolute inset-0 w-full h-full" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent" />

      <AnimatePresence mode="wait">
        <motion.div
          key={movie.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
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
          {movie.original_name && <p title={movie.original_name} className="text-gray-400 text-lg mb-4 line-clamp-1">{movie.original_name}</p>}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(`/movie/${movie.slug}/watch`)}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Play className="w-5 h-5 fill-white" />
              Xem ngay
            </button>
            <button
              type="button"
              onClick={() => navigate(`/movie/${movie.slug}`)}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-colors border border-white/20"
            >
              <Info className="w-5 h-5" />
              Chi tiết
            </button>
            {onFavoriteToggle && (
              <button
                type="button"
                onClick={() => onFavoriteToggle(movie)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg backdrop-blur-sm transition-colors border ${isFavorite?.(movie.slug) ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite?.(movie.slug) ? 'fill-red-400' : ''}`} />
                {isFavorite?.(movie.slug) ? 'Đã thích' : 'Yêu thích'}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Phim trước"
            onClick={() => goTo(index - 1)}
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            aria-label="Phim tiếp theo"
            onClick={() => goTo(index + 1)}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-5 right-4 md:right-8 lg:right-16 z-20 flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                aria-label={`Xem slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-red-500' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
