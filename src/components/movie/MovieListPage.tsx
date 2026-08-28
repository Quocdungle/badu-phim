import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { MovieCard } from '@/components/movie/MovieCard'
import { MovieGrid } from '@/components/movie/MovieGrid'
import { Pagination } from '@/components/ui/Pagination'
import type { ApiListResponse } from '@/types'
import type { UseQueryResult } from '@tanstack/react-query'
import { useMemo, useRef, useState } from 'react'

interface MovieListPageProps {
  title: string
  queryResult: UseQueryResult<ApiListResponse>
  page?: number
  onPageChange: (p: number) => void
}

export const MovieListPage = ({ title, queryResult, page = 1, onPageChange }: MovieListPageProps) => {
  const { data, isLoading, isError, refetch } = queryResult
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [uiPage, setUiPage] = useState(page)
  // API only supports fetching by page number (no sort param), so "oldest" reads pages
  // back-to-front: uiPage 1 maps to the API's last page, which holds the oldest items.
  const totalPageRef = useRef(1)
  if (data?.paginate?.total_page) totalPageRef.current = data.paginate.total_page

  const displayTitle = data?.cat?.title ?? title

  const items = useMemo(() => {
    const list = data?.items ?? []
    return sortOrder === 'newest' ? list : [...list].reverse()
  }, [data?.items, sortOrder])

  const requestPage = (nextUiPage: number, order: 'newest' | 'oldest') => {
    setUiPage(nextUiPage)
    const apiPage = order === 'oldest' ? Math.max(1, totalPageRef.current - nextUiPage + 1) : nextUiPage
    onPageChange(apiPage)
  }

  const handleSortChange = (order: 'newest' | 'oldest') => {
    setSortOrder(order)
    requestPage(1, order)
  }

  return (
    <div className="pt-20 pb-12 max-w-screen-xl mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-bold text-white">{displayTitle}</h1>
        <select
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value as 'newest' | 'oldest')}
          className="bg-[#15151C] border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <>
          <MovieGrid loading={isLoading}>
            {items.map((movie) => <MovieCard key={movie.slug} movie={movie} />)}
          </MovieGrid>

          {!isLoading && items.length === 0 && <EmptyState title="Không có phim nào" />}

          {data?.paginate && (
            <Pagination currentPage={uiPage} totalPage={data.paginate.total_page} onPageChange={(p) => requestPage(p, sortOrder)} />
          )}
        </>
      )}
    </div>
  )
}

