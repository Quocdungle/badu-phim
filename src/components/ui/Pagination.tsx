import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

interface PaginationProps {
  currentPage: number
  totalPage: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPage, onPageChange }: PaginationProps) => {
  const [, setSearchParams] = useSearchParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  if (totalPage <= 1) return null

  const getPages = (): (number | '...')[] => {
    const pages: (number | '...')[] = []
    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) pages.push(i)
      return pages
    }
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPage - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPage - 2) pages.push('...')
    pages.push(totalPage)
    return pages
  }

  const handlePage = (page: number) => {
    onPageChange(page)
    setSearchParams((prev) => {
      prev.set('page', String(page))
      return prev
    })
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">
      <button
        disabled={currentPage <= 1}
        onClick={() => handlePage(currentPage - 1)}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="px-3 py-2 text-gray-500">…</span>
        ) : (
          <button
            key={page}
            onClick={() => handlePage(page)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-red-600 text-white'
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage >= totalPage}
        onClick={() => handlePage(currentPage + 1)}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  )
}
