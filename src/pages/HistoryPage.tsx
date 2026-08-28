import { EmptyState } from '@/components/common/EmptyState'
import { SafeImage } from '@/components/common/SafeImage'
import { MainLayout } from '@/components/layout/MainLayout'
import type { WatchHistory } from '@/types'
import { useHistoryStore } from '@/stores/historyStore'
import { History, Play, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch {
    return iso
  }
}

const HistoryCard = ({ item, onRemove }: { item: WatchHistory; onRemove: () => void }) => (
  <div className="group relative bg-[#15151C] rounded-xl overflow-hidden">
    <Link to={`/movie/${item.movieSlug}/watch?episode=${item.episodeSlug}&server=${item.serverIndex}`} className="flex gap-3 p-3">
      <SafeImage src={item.poster} alt={item.movieName} objectPosition="top" className="w-16 h-24 rounded-lg flex-shrink-0" />
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p title={item.movieName} className="text-white text-sm font-medium line-clamp-2">{item.movieName}</p>
          <p className="text-gray-400 text-xs mt-1">{item.episodeName}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Play className="w-4 h-4 text-red-400 fill-red-400" />
          <span className="text-gray-500 text-xs">{formatDate(item.watchedAt)}</span>
        </div>
      </div>
    </Link>
    <button onClick={onRemove} className="absolute top-2 right-2 p-1 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600/80">
      <X className="w-3.5 h-3.5 text-white" />
    </button>
  </div>
)

export const HistoryPage = () => {
  const { history, removeHistory, clearAll } = useHistoryStore()
  const recent = history.slice(0, 4)
  const older = history.slice(4)

  return (
    <MainLayout>
      <div className="pt-24 max-w-screen-xl mx-auto px-4 md:px-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">Lịch sử xem</h1>
            <span className="text-gray-500">({history.length})</span>
          </div>
          {history.length > 0 && (
            <button onClick={clearAll} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
              Xóa tất cả
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <EmptyState title="Chưa có lịch sử xem" description="Xem phim để lịch sử xuất hiện ở đây." />
        ) : (
          <>
            {recent.length > 0 && (
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-white mb-4">Tiếp tục xem</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recent.map((item) => <HistoryCard key={item.movieSlug} item={item} onRemove={() => removeHistory(item.movieSlug)} />)}
                </div>
              </div>
            )}
            {older.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Đã xem</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {older.map((item) => <HistoryCard key={`${item.movieSlug}-${item.watchedAt}`} item={item} onRemove={() => removeHistory(item.movieSlug)} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  )
}
