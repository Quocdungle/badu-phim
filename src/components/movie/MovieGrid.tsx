const MovieCardSkeleton = () => (
  <div className="rounded-lg overflow-hidden bg-[#15151C] animate-pulse">
    <div className="aspect-[2/3] bg-[#1a1a2e]" />
    <div className="p-2 space-y-2">
      <div className="h-3.5 bg-[#1a1a2e] rounded w-4/5" />
      <div className="h-3 bg-[#1a1a2e] rounded w-1/3" />
    </div>
  </div>
)

interface MovieGridProps {
  children?: React.ReactNode
  loading?: boolean
  skeletonCount?: number
  className?: string
}

export const MovieGrid = ({
  children,
  loading = false,
  skeletonCount = 12,
  className = '',
}: MovieGridProps) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 ${className}`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 ${className}`}>
      {children}
    </div>
  )
}
