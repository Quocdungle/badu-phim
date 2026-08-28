import { Loading } from '@/components/common/Loading'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'

interface VideoPlayerProps {
  embed: string | null | undefined
  title: string
}

export const VideoPlayer = ({ embed, title }: VideoPlayerProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d0d]">
          <Loading size="lg" />
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d0d] gap-3">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-white text-center px-4">Không thể tải video. Thử chọn server khác.</p>
        </div>
      ) : embed ? (
        <iframe
          src={embed}
          title={title}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen"
          onLoad={() => setLoading(false)}
          onError={() => { setError(true); setLoading(false) }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d0d]">
          <p className="text-gray-400">Không có link phát</p>
        </div>
      )}
    </div>
  )
}
