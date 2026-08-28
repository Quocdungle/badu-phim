import { SafeImage } from '@/components/common/SafeImage'
import { useDebounce, useClickOutside } from '@/hooks/useUtils'
import { useSearchMovies } from '@/hooks/useMovies'
import { Search as SearchIcon, X } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const debouncedQuery = useDebounce(query, 450)
  const containerRef = useClickOutside(() => setOpen(false))
  const inputRef = useRef<HTMLInputElement>(null)

  const { data, isFetching } = useSearchMovies(debouncedQuery, 1)
  const results = data?.items?.slice(0, 6) ?? []

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!query.trim()) return
      setOpen(false)
      setQuery('')
      navigate(`/search?keyword=${encodeURIComponent(query.trim())}`)
    },
    [query, navigate]
  )

  const handleSelect = (slug: string) => {
    setOpen(false)
    setQuery('')
    navigate(`/movie/${slug}`)
  }

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            placeholder="Tìm kiếm phim..."
            className="pl-9 pr-8 py-2 w-44 md:w-60 bg-white/10 border border-white/10 rounded-full text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-red-500 focus:w-64 transition-all"
          />
          {query && (
            <button type="button" onClick={() => { setQuery(''); inputRef.current?.focus() }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </form>

      {open && debouncedQuery.trim().length > 0 && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-[#15151C] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
          {isFetching ? (
            <div className="p-4 text-center text-gray-400 text-sm">Đang tìm kiếm...</div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-gray-400 text-sm">Không tìm thấy kết quả</div>
          ) : (
            <>
              <div className="divide-y divide-white/5">
                {results.map((movie) => (
                  <button key={movie.slug} onClick={() => handleSelect(movie.slug)} className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors text-left">
                    <SafeImage src={movie.poster_url || movie.thumb_url} alt={movie.name} className="w-10 h-14 rounded flex-shrink-0" />
                    <div className="min-w-0">
                      <p title={movie.name} className="text-white text-sm font-medium line-clamp-1">{movie.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{movie.year}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => { setOpen(false); navigate(`/search?keyword=${encodeURIComponent(debouncedQuery.trim())}`) }} className="w-full p-3 text-red-400 text-sm hover:bg-white/5 transition-colors text-center border-t border-white/5">
                Xem tất cả kết quả cho "{debouncedQuery}"
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
