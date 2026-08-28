import { SafeImage } from '@/components/common/SafeImage'
import type { Movie } from '@/types'
import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps) => (
  <Link to={`/movie/${movie.slug}`} className="group relative block rounded-lg overflow-hidden bg-[#15151C] cursor-pointer">
    <div className="relative aspect-[2/3] overflow-hidden">
      <SafeImage
        src={movie.poster_url || movie.thumb_url}
        alt={movie.name}
        objectPosition="top"
        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center">
          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
        </div>
      </div>
      <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
        {movie.quality && (
          <span className="px-1.5 py-0.5 bg-red-600 text-white text-xs font-bold rounded">{movie.quality}</span>
        )}
        {movie.current_episode && (
          <span className="px-1.5 py-0.5 bg-black/70 text-gray-300 text-xs rounded">{movie.current_episode}</span>
        )}
      </div>
    </div>
    <div className="p-2 bg-[#15151C] group-hover:bg-white/5 transition-colors duration-300">
      <p title={movie.name} className="text-white text-sm font-medium line-clamp-1">{movie.name}</p>
      <p className="text-gray-500 text-xs mt-0.5">{movie.year ?? ''}</p>
    </div>
  </Link>
)
