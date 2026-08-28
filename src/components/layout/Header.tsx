import { SearchBar } from '@/components/ui/SearchBar'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useHistoryStore } from '@/stores/historyStore'
import { cn } from '@/utils/helpers'
import { ChevronDown, Film, Heart, History, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const MOVIE_TYPES = [
  { label: 'Phim lẻ', slug: 'phim-le' },
  { label: 'Phim bộ', slug: 'phim-bo' },
  { label: 'TV Show', slug: 'tv-shows' },
  { label: 'Hoạt hình', slug: 'hoat-hinh' },
]

const GENRES = [
  { name: 'Hành Động', slug: 'hanh-dong' },
  { name: 'Tình Cảm', slug: 'tinh-cam' },
  { name: 'Hài Hước', slug: 'hai-huoc' },
  { name: 'Cổ Trang', slug: 'co-trang' },
  { name: 'Tâm Lý', slug: 'tam-ly' },
  { name: 'Kinh Dị', slug: 'kinh-di' },
  { name: 'Âm Nhạc', slug: 'am-nhac' },
  { name: 'Thần Thoại', slug: 'than-thoai' },
  { name: 'Khoa Học Viễn Tưởng', slug: 'khoa-hoc-vien-tuong' },
  { name: 'Phiêu Lưu', slug: 'phieu-luu' },
  { name: 'Hoạt Hình', slug: 'hoat-hinh-the-loai' },
  { name: 'Chiến Tranh', slug: 'chien-tranh' },
]

const COUNTRIES = [
  { name: 'Hàn Quốc', slug: 'han-quoc' },
  { name: 'Trung Quốc', slug: 'trung-quoc' },
  { name: 'Nhật Bản', slug: 'nhat-ban' },
  { name: 'Âu Mỹ', slug: 'au-my' },
  { name: 'Thái Lan', slug: 'thai-lan' },
  { name: 'Việt Nam', slug: 'viet-nam' },
  { name: 'Đài Loan', slug: 'dai-loan' },
  { name: 'Hồng Kông', slug: 'hong-kong' },
]

const YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018]

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [genreOpen, setGenreOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [yearOpen, setYearOpen] = useState(false)
  const genreRef = useRef<HTMLDivElement>(null)
  const countryRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const favoriteCount = useFavoritesStore((s) => s.favorites.length)
  const historyCount = useHistoryStore((s) => s.history.length)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (genreRef.current && !genreRef.current.contains(e.target as Node)) setGenreOpen(false)
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false)
      if (yearRef.current && !yearRef.current.contains(e.target as Node)) setYearOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn('text-sm font-medium transition-colors hover:text-red-400', isActive ? 'text-red-400' : 'text-gray-300')

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-[#0B0B0F]/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/60 to-transparent')}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <Film className="w-7 h-7 text-red-500" />
          <span className="text-white font-bold text-xl tracking-tight">BADUPHIM</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-4">
          <NavLink to="/" end className={navLinkClass}>Trang chủ</NavLink>
          {MOVIE_TYPES.map((t) => (
            <NavLink key={t.slug} to={`/movies/category/${t.slug}`} className={navLinkClass}>{t.label}</NavLink>
          ))}

          {/* Genre dropdown */}
          <div ref={genreRef} className="relative">
            <button onClick={() => { setGenreOpen((o) => !o); setCountryOpen(false); setYearOpen(false) }} className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors">
              Thể loại <ChevronDown className={cn('w-4 h-4 transition-transform', genreOpen && 'rotate-180')} />
            </button>
            {genreOpen && (
              <div className="absolute top-full mt-2 left-0 w-72 bg-[#15151C] border border-white/10 rounded-xl shadow-2xl p-2 grid grid-cols-2 gap-0.5 max-h-80 overflow-y-auto">
                {GENRES.map((g) => (
                  <button key={g.slug} onClick={() => { navigate(`/genre/${g.slug}`); setGenreOpen(false) }} className="px-3 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors leading-tight">
                    {g.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Country dropdown */}
          <div ref={countryRef} className="relative">
            <button onClick={() => { setCountryOpen((o) => !o); setGenreOpen(false); setYearOpen(false) }} className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors">
              Quốc gia <ChevronDown className={cn('w-4 h-4 transition-transform', countryOpen && 'rotate-180')} />
            </button>
            {countryOpen && (
              <div className="absolute top-full mt-2 left-0 w-40 bg-[#15151C] border border-white/10 rounded-xl shadow-2xl p-2 max-h-80 overflow-y-auto">
                {COUNTRIES.map((c) => (
                  <button key={c.slug} onClick={() => { navigate(`/country/${c.slug}`); setCountryOpen(false) }} className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year dropdown */}
          <div ref={yearRef} className="relative">
            <button onClick={() => { setYearOpen((o) => !o); setGenreOpen(false); setCountryOpen(false) }} className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors">
              Năm phát hành <ChevronDown className={cn('w-4 h-4 transition-transform', yearOpen && 'rotate-180')} />
            </button>
            {yearOpen && (
              <div className="absolute top-full mt-2 left-0 w-36 bg-[#15151C] border border-white/10 rounded-xl shadow-2xl p-2 grid grid-cols-2 gap-0.5 max-h-80 overflow-y-auto">
                {YEARS.map((y) => (
                  <button key={y} onClick={() => { navigate(`/year/${y}`); setYearOpen(false) }} className="px-3 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block"><SearchBar /></div>
          <Link to="/favorites" className="relative p-2 text-gray-300 hover:text-red-400 transition-colors">
            <Heart className="w-5 h-5" />
            {favoriteCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                {favoriteCount > 9 ? '9+' : favoriteCount}
              </span>
            )}
          </Link>
          <Link to="/history" className="relative p-2 text-gray-300 hover:text-red-400 transition-colors">
            <History className="w-5 h-5" />
            {historyCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen((o) => !o)} className="xl:hidden p-2 text-gray-300 hover:text-white transition-colors">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#0B0B0F]/98 backdrop-blur-md border-t border-white/5 px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <SearchBar />
          <div className="space-y-2">
            <NavLink to="/" end className={({ isActive }) => cn('block text-sm font-medium', isActive ? 'text-red-400' : 'text-gray-300')} onClick={() => setMobileOpen(false)}>Trang chủ</NavLink>
            {MOVIE_TYPES.map((t) => (
              <NavLink key={t.slug} to={`/movies/category/${t.slug}`} className={({ isActive }) => cn('block text-sm font-medium', isActive ? 'text-red-400' : 'text-gray-300')} onClick={() => setMobileOpen(false)}>{t.label}</NavLink>
            ))}
          </div>
          <div className="border-t border-white/5 pt-3">
            <p className="text-gray-500 text-xs mb-2">Thể loại</p>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <button key={g.slug} onClick={() => { navigate(`/genre/${g.slug}`); setMobileOpen(false) }} className="px-2 py-1 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">{g.name}</button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 pt-3">
            <p className="text-gray-500 text-xs mb-2">Quốc gia</p>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.map((c) => (
                <button key={c.slug} onClick={() => { navigate(`/country/${c.slug}`); setMobileOpen(false) }} className="px-2 py-1 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">{c.name}</button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 pt-3">
            <p className="text-gray-500 text-xs mb-2">Năm phát hành</p>
            <div className="flex flex-wrap gap-2">
              {YEARS.map((y) => (
                <button key={y} onClick={() => { navigate(`/year/${y}`); setMobileOpen(false) }} className="px-2 py-1 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">{y}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
