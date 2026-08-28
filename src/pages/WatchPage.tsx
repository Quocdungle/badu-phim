import { ErrorState } from '@/components/common/ErrorState'
import { Loading } from '@/components/common/Loading'
import { SafeImage } from '@/components/common/SafeImage'
import { MainLayout } from '@/components/layout/MainLayout'
import { EpisodeList } from '@/components/movie/EpisodeList'
import { MovieInfo } from '@/components/movie/MovieInfo'
import { VideoPlayer } from '@/components/movie/VideoPlayer'
import { useMovieDetail } from '@/hooks/useMovies'
import { useHistoryStore } from '@/stores/historyStore'
import { Info, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

export const WatchPage = () => {
  const { slug = '' } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, isLoading, isError, refetch } = useMovieDetail(slug)
  const addHistory = useHistoryStore((s) => s.addHistory)
  const getLastWatched = useHistoryStore((s) => s.getLastWatched)
  const [infoOpen, setInfoOpen] = useState(false)
  const [resumePrompt, setResumePrompt] = useState<{ episodeSlug: string; episodeName: string; serverIndex: number } | null>(null)
  const [resumeDismissed, setResumeDismissed] = useState(false)

  const movie = data?.movie
  const servers = movie?.episodes ?? []

  const episodeSlugParam = searchParams.get('episode')
  const serverParam = searchParams.get('server')

  const { currentServerIndex, currentServer, currentEpisode } = useMemo(() => {
    if (!servers.length) return { currentServerIndex: 0, currentServer: null, currentEpisode: null }
    const idx = serverParam != null ? Math.min(Number(serverParam) || 0, servers.length - 1) : 0
    const targetServer = servers[idx]
    const ep = episodeSlugParam
      ? (targetServer.items.find((e) => e.slug === episodeSlugParam) ?? targetServer.items[0])
      : targetServer.items[0]
    return { currentServerIndex: idx, currentServer: targetServer, currentEpisode: ep ?? null }
  }, [servers, serverParam, episodeSlugParam])

  // offer to resume last watched episode when arriving without an explicit episode in the URL
  useEffect(() => {
    if (!movie || resumeDismissed || episodeSlugParam) return
    const last = getLastWatched(movie.slug)
    if (!last || last.episodeSlug === currentEpisode?.slug) return
    const server = servers[last.serverIndex]
    const stillExists = server?.items.some((e) => e.slug === last.episodeSlug)
    if (!stillExists) return
    setResumePrompt({ episodeSlug: last.episodeSlug, episodeName: last.episodeName, serverIndex: last.serverIndex })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie?.slug, episodeSlugParam, resumeDismissed])

  useEffect(() => {
    if (!movie || !currentEpisode) return
    addHistory({
      movieSlug: movie.slug,
      movieName: movie.name,
      episodeSlug: currentEpisode.slug,
      episodeName: currentEpisode.name,
      serverIndex: currentServerIndex,
      serverName: currentServer?.server_name ?? '',
      poster: movie.poster_url || movie.thumb_url,
      watchedAt: new Date().toISOString(),
    })
  }, [movie?.slug, currentEpisode?.slug])

  const handleEpisodeSelect = (serverIndex: number, episodeSlug: string) => {
    setSearchParams({ episode: episodeSlug, server: String(serverIndex) })
  }

  const handleResumeConfirm = () => {
    if (!resumePrompt) return
    setSearchParams({ episode: resumePrompt.episodeSlug, server: String(resumePrompt.serverIndex) })
    setResumePrompt(null)
    setResumeDismissed(true)
  }

  const handleResumeDismiss = () => {
    setResumePrompt(null)
    setResumeDismissed(true)
  }

  useEffect(() => {
    if (!infoOpen) return
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setInfoOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [infoOpen])

  if (isLoading) return <MainLayout><div className="pt-24 flex justify-center"><Loading size="lg" /></div></MainLayout>
  if (isError || !movie) return <MainLayout><div className="pt-20"><ErrorState onRetry={() => refetch()} /></div></MainLayout>

  return (
    <MainLayout>
      <div className="pt-16 max-w-screen-xl mx-auto px-4 md:px-6 pb-12">
        <div className="py-4 flex items-center gap-2 text-sm text-gray-400 flex-wrap">
          <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link to={`/movie/${movie.slug}`} title={movie.name} className="hover:text-white transition-colors line-clamp-1 max-w-xs">{movie.name}</Link>
          <span>/</span>
          <span className="text-gray-300">{currentEpisode?.name ?? 'Xem phim'}</span>
        </div>

        <VideoPlayer
          key={currentEpisode?.embed ?? ''}
          embed={currentEpisode?.embed}
          title={`${movie.name}${currentEpisode ? ` - ${currentEpisode.name}` : ''}`}
        />

        <div className="mt-4 mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-white">{movie.name}</h1>
          {currentEpisode && (
            <p className="text-gray-400 text-sm mt-1">
              {currentServer?.server_name} – Tập {currentEpisode.name}
            </p>
          )}
        </div>

        {servers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Danh sách tập</h2>
            <EpisodeList
              servers={servers}
              currentServerIndex={currentServerIndex}
              currentEpisodeSlug={currentEpisode?.slug}
              onSelect={handleEpisodeSelect}
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => setInfoOpen(true)}
          className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm transition-colors"
        >
          <Info className="w-4 h-4" /> Xem thông tin phim
        </button>
      </div>

      {resumePrompt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#15151C] border border-white/10 rounded-xl p-5 max-w-sm w-full">
            <h3 className="text-white font-semibold mb-2">Tiếp tục xem?</h3>
            <p className="text-gray-400 text-sm mb-4">
              Bạn đã xem đến <span className="text-white">{resumePrompt.episodeName}</span>. Bạn có muốn tiếp tục xem từ tập này không?
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={handleResumeConfirm} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors">
                Tiếp tục
              </button>
              <button type="button" onClick={handleResumeDismiss} className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-colors">
                Xem từ đầu
              </button>
            </div>
          </div>
        </div>
      )}

      {infoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Thông tin phim"
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 px-0 sm:px-4"
          onClick={() => setInfoOpen(false)}
        >
          <div
            role="document"
            className="bg-[#15151C] border border-white/10 rounded-t-2xl sm:rounded-2xl p-5 max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-white font-semibold text-lg">Thông tin phim</h3>
              <button type="button" onClick={() => setInfoOpen(false)} className="p-1 text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-24 flex-shrink-0">
                <SafeImage src={movie.poster_url || movie.thumb_url} alt={movie.name} objectPosition="top" className="w-full aspect-[2/3] rounded-lg" />
              </div>
              <div className="min-w-0">
                <p title={movie.name} className="text-white font-semibold line-clamp-2">{movie.name}</p>
                {movie.original_name && <p title={movie.original_name} className="text-gray-400 text-sm line-clamp-1">{movie.original_name}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  {movie.quality && <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">{movie.quality}</span>}
                  {movie.year && <span className="px-2 py-0.5 bg-white/10 text-gray-300 text-xs rounded">{movie.year}</span>}
                </div>
              </div>
            </div>
            <MovieInfo movie={movie} />
            {movie.description && (
              <div
                className="text-gray-300 text-sm leading-relaxed mt-4"
                dangerouslySetInnerHTML={{ __html: movie.description }}
              />
            )}
            <Link to={`/movie/${movie.slug}`} className="inline-block mt-4 text-red-400 hover:text-red-300 text-sm transition-colors">
              Xem trang chi tiết đầy đủ →
            </Link>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

