import type { MovieDetail } from '@/types'

interface MovieInfoProps {
  movie: MovieDetail
}

export const MovieInfo = ({ movie }: MovieInfoProps) => {
  const genres = movie.categories.genres
  const countries = movie.categories.countries

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
      {movie.time && <MetaRow label="Thời lượng" value={movie.time} />}
      {movie.total_episodes != null && <MetaRow label="Số tập" value={String(movie.total_episodes)} />}
      {genres.length > 0 && <MetaRow label="Thể loại" value={genres.map((g) => g.name).join(', ')} />}
      {countries.length > 0 && <MetaRow label="Quốc gia" value={countries.map((c) => c.name).join(', ')} />}
      {movie.director && <MetaRow label="Đạo diễn" value={movie.director} />}
      {movie.casts && <MetaRow label="Diễn viên" value={movie.casts} />}
    </div>
  )
}

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-2">
    <span className="text-gray-500 shrink-0 w-24 sm:w-28">{label}:</span>
    <span className="text-gray-200 min-w-0">{value}</span>
  </div>
)
