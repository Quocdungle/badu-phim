import { formatImageUrl } from '@/utils/helpers'
import { useState } from 'react'

interface SafeImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  fallback?: string
  /** CSS object-position for the underlying <img>; defaults to 'center' */
  objectPosition?: string
}

const DEFAULT_FALLBACK = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzFhMWEyZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNDQ0IiBmb250LXNpemU9IjQ4Ij7wn46GPC90ZXh0Pjwvc3ZnPg=='

export const SafeImage = ({ src, alt, className = '', fallback = DEFAULT_FALLBACK, objectPosition = 'center' }: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(formatImageUrl(src))
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-[#1a1a2e] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-[#1a1a2e]" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setImgSrc(fallback)
          setLoaded(true)
        }}
      />
    </div>
  )
}
