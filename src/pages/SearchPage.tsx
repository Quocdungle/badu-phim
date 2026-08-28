import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { MainLayout } from '@/components/layout/MainLayout'
import { MovieCard } from '@/components/movie/MovieCard'
import { MovieGrid } from '@/components/movie/MovieGrid'
import { Pagination } from '@/components/ui/Pagination'
import { useDebounce } from '@/hooks/useUtils'
import { useSearchMovies } from '@/hooks/useMovies'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQ = searchParams.get('keyword') ?? ''
  const [inputValue, setInputValue] = useState(initialQ)
  const [page, setPage] = useState(1)
  const debouncedQ = useDebounce(inputValue, 450)

  const { data, isLoading, isError, refetch } = useSearchMovies(debouncedQ, page)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    setPage(1)
    navigate(`/search?keyword=${encodeURIComponent(inputValue.trim())}`, { replace: true })
  }

  return (
    <MainLayout>
      <div className="pt-24 max-w-screen-xl mx-auto px-4 md:px-6 pb-12">
        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-8 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => { setInputValue(e.target.value); setPage(1) }}
              placeholder="Tìm kiếm phim..."
              autoFocus
              className="w-full pl-12 pr-4 py-3 bg-[#15151C] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 text-base"
            />
          </div>
        </form>

        {debouncedQ && (
          <h1 className="text-xl md:text-2xl font-bold text-white mb-6">
            Kết quả tìm kiếm cho "{debouncedQ}"
            {data && <span className="text-gray-400 font-normal text-base ml-2">({data.paginate.total_items} phim)</span>}
          </h1>
        )}

        {isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !debouncedQ.trim() ? (
          <EmptyState title="Nhập từ khóa để tìm kiếm" description="Tìm kiếm theo tên phim, diễn viên..." />
        ) : (
          <>
            <MovieGrid loading={isLoading}>
              {data?.items?.map((movie) => (
                <MovieCard key={movie.slug} movie={movie} />
              ))}
            </MovieGrid>

            {!isLoading && data?.items?.length === 0 && (
              <EmptyState title={`Không tìm thấy kết quả cho "${debouncedQ}"`} description="Thử từ khóa khác." />
            )}

            {data?.paginate && (
              <Pagination
                currentPage={data.paginate.current_page}
                totalPage={data.paginate.total_page}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </MainLayout>
  )
}
