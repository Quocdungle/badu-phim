import type { Movie } from '@/types'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MovieCard } from './MovieCard'

interface MovieRowProps {
  title: string
  movies: Movie[]
  seeAllHref?: string
  loading?: boolean
}

export const MovieRow = ({ title, movies, seeAllHref, loading }: MovieRowProps) => (
  <section className="mb-10">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
      {seeAllHref && (
        <Link to={seeAllHref} className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors">
          Xem thêm <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
    <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-36 md:w-44 aspect-[2/3] bg-[#15151C] rounded-lg animate-pulse" />
          ))
        : movies.slice(0, 14).map((movie) => (
            <div key={movie.slug} className="flex-shrink-0 w-36 md:w-44">
              <MovieCard movie={movie} />
            </div>
          ))}
    </div>
  </section>
)
