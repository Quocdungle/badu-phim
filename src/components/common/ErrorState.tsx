import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  className?: string
}

export const ErrorState = ({ message = 'Không thể tải dữ liệu.', onRetry, className = '' }: ErrorStateProps) => (
  <div className={`flex flex-col items-center justify-center gap-4 py-16 text-center ${className}`}>
    <AlertCircle className="w-12 h-12 text-red-500" />
    <div>
      <p className="text-white font-medium">{message}</p>
      <p className="text-gray-400 text-sm mt-1">Vui lòng thử lại.</p>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Thử lại
      </button>
    )}
  </div>
)
