import { EmptyState } from '@/components/common/EmptyState'
import { SafeImage } from '@/components/common/SafeImage'
import { MainLayout } from '@/components/layout/MainLayout'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { Heart, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export const FavoritesPage = () => {
  const { favorites, removeFavorite, clearAll } = useFavoritesStore()

  return (
    <MainLayout>
      <div className="pt-24 max-w-screen-xl mx-auto px-4 md:px-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">Yêu thích</h1>
            <span className="text-gray-500">({favorites.length})</span>
          </div>
          {favorites.length > 0 && (
            <button onClick={clearAll} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
              Xóa tất cả
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <EmptyState title="Chưa có phim yêu thích" description="Thêm phim vào danh sách để xem sau." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {favorites.map((movie) => (
              <div key={movie.slug} className="group relative">
                <Link to={`/movie/${movie.slug}`} className="block rounded-lg overflow-hidden bg-[#15151C]">
                  <div className="aspect-[2/3]">
                    <SafeImage src={movie.poster_url || movie.thumb_url} alt={movie.name} objectPosition="top" className="w-full h-full" />
                  </div>
                  <div className="p-2">
                    <p title={movie.name} className="text-white text-sm font-medium line-clamp-1">{movie.name}</p>
                    <p className="text-gray-500 text-xs">{movie.year ?? ''}</p>
                  </div>
                </Link>
                <button onClick={() => removeFavorite(movie.slug)} className="absolute top-2 right-2 p-1 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600/80">
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
