interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Loading = ({ size = 'md', className = '' }: LoadingProps) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} border-2 border-white/20 border-t-red-500 rounded-full animate-spin`} />
    </div>
  )
}

export const PageLoading = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loading size="lg" />
  </div>
)
