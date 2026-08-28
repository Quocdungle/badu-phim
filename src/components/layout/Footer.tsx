import { Film } from 'lucide-react'
import { Link } from 'react-router-dom'

const MOVIE_TYPES = [
  { label: 'Phim lẻ', slug: 'phim-le' },
  { label: 'Phim bộ', slug: 'phim-bo' },
  { label: 'TV Show', slug: 'tv-shows' },
  { label: 'Hoạt hình', slug: 'hoat-hinh' },
]

const RECENT_YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020]

export const Footer = () => (
  <footer className="bg-[#0D0D12] border-t border-white/5 py-10 mt-16">
    <div className="max-w-screen-xl mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <Film className="w-6 h-6 text-red-500" />
            <span className="text-white font-bold text-lg">BADUPHIM</span>
          </Link>
          <p className="text-gray-500 text-sm max-w-xs">
            Xem phim online miễn phí, chất lượng cao, cập nhật liên tục.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-6">
          <div>
            <p className="text-white text-sm font-medium mb-2">Danh mục</p>
            <div className="space-y-1.5">
              {MOVIE_TYPES.map((t) => (
                <Link key={t.slug} to={`/movies/category/${t.slug}`} className="block text-gray-400 hover:text-red-400 text-sm transition-colors">
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-2">Năm phát hành</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 max-w-[140px]">
              {RECENT_YEARS.map((y) => (
                <Link key={y} to={`/year/${y}`} className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                  {y}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-2">Cá nhân</p>
            <div className="space-y-1.5">
              <Link to="/favorites" className="block text-gray-400 hover:text-red-400 text-sm transition-colors">Yêu thích</Link>
              <Link to="/history" className="block text-gray-400 hover:text-red-400 text-sm transition-colors">Lịch sử xem</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-center text-gray-600 text-xs">
        © {new Date().getFullYear()} BADUPHIM. Chill cùng BADU
      </div>
    </div>
  </footer>
)
