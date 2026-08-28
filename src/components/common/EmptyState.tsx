import { Film } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  className?: string
}

export const EmptyState = ({
  title = 'Không có kết quả',
  description = 'Thử tìm kiếm với từ khóa khác.',
  className = '',
}: EmptyStateProps) => (
  <div className={`flex flex-col items-center justify-center gap-4 py-16 text-center ${className}`}>
    <Film className="w-12 h-12 text-gray-600" />
    <div>
      <p className="text-white font-medium">{title}</p>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
    </div>
  </div>
)
