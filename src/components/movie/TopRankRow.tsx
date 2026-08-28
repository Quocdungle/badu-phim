import { SafeImage } from '@/components/common/SafeImage'
import type { Movie } from '@/types'
import { Link } from 'react-router-dom'

interface TopRankRowProps {
  title: string
  movies: Movie[]
  loading?: boolean
}

const RankCardSkeleton = () => (
  <div className="flex-shrink-0 w-32 md:w-40 pl-6 md:pl-8">
    <div className="aspect-[2/3] rounded-lg bg-[#15151C] animate-pulse" />
  </div>
)

export const TopRankRow = ({ title, movies, loading }: TopRankRowProps) => (
  <section className="mb-10">
    <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
    <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <RankCardSkeleton key={i} />)
        : movies.slice(0, 10).map((movie, i) => (
            <Link
              key={movie.slug}
              to={`/movie/${movie.slug}`}
              className="group relative flex-shrink-0 w-32 md:w-40 pl-6 md:pl-8"
            >
              <span
                className="absolute left-0 bottom-0 z-0 select-none leading-none font-black text-[#15151C] text-[5rem] md:text-[7rem]"
                style={{ WebkitTextStroke: '3px rgba(255,255,255,0.25)' }}
              >
                {i + 1}
              </span>
              <div className="relative z-10 aspect-[2/3] rounded-lg overflow-hidden bg-[#15151C]">
                <SafeImage
                  src={movie.poster_url || movie.thumb_url}
                  alt={movie.name}
                  objectPosition="top"
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
    </div>
  </section>
)
