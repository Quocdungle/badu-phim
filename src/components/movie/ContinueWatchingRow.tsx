import { SafeImage } from '@/components/common/SafeImage'
import { useHistoryStore } from '@/stores/historyStore'
import { Play, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ContinueWatchingRow = () => {
  const history = useHistoryStore((s) => s.history)
  const removeHistory = useHistoryStore((s) => s.removeHistory)

  if (history.length === 0) return null

  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Tiếp tục xem</h2>
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {history.slice(0, 14).map((item) => (
          <div key={item.movieSlug} className="group relative flex-shrink-0 w-36 md:w-44">
            <Link
              to={`/movie/${item.movieSlug}/watch?episode=${item.episodeSlug}&server=${item.serverIndex}`}
              className="block relative aspect-[2/3] rounded-lg overflow-hidden bg-[#15151C]"
            >
              <SafeImage src={item.poster} alt={item.movieName} objectPosition="top" className="w-full h-full transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-2">
                <p title={item.movieName} className="text-white text-xs font-medium line-clamp-1">{item.movieName}</p>
                <p title={item.episodeName} className="text-gray-300 text-[11px] line-clamp-1">{item.episodeName}</p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => removeHistory(item.movieSlug)}
              aria-label="Xóa khỏi lịch sử"
              className="absolute top-2 right-2 p-1 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600/80"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
