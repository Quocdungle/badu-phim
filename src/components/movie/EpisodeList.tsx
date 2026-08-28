import type { EpisodeServer } from '@/types'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

interface EpisodeListProps {
  servers: EpisodeServer[]
  currentServerIndex?: number
  currentEpisodeSlug?: string
  onSelect: (serverIndex: number, episodeSlug: string) => void
}

export const EpisodeList = ({ servers, currentServerIndex = 0, currentEpisodeSlug, onSelect }: EpisodeListProps) => {
  const [search, setSearch] = useState('')

  const currentItems = servers[currentServerIndex]?.items ?? []

  const filtered = useMemo(
    () => search.trim() ? currentItems.filter((ep) => ep.name.toLowerCase().includes(search.toLowerCase())) : currentItems,
    [currentItems, search]
  )

  if (!servers.length) return null

  const handleServerChange = (serverIndex: number) => {
    if (serverIndex === currentServerIndex) return
    const targetItems = servers[serverIndex]?.items ?? []
    // try to stay on the same episode when switching servers, otherwise fall back to episode 1
    const matched = currentEpisodeSlug ? targetItems.find((e) => e.slug === currentEpisodeSlug) : undefined
    const nextEpisode = matched ?? targetItems[0]
    if (nextEpisode) onSelect(serverIndex, nextEpisode.slug)
  }

  return (
    <div className="bg-[#15151C] rounded-xl p-4">
      {servers.length > 1 && (
        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-2">Chọn server:</p>
          <div className="flex flex-wrap gap-2">
            {servers.map((server, idx) => (
              <button
                key={idx}
                onClick={() => handleServerChange(idx)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentServerIndex === idx ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
              >
                {server.server_name}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentItems.length > 20 && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm tập..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-red-500"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
        {filtered.map((ep) => (
          <button
            key={ep.slug}
            onClick={() => onSelect(currentServerIndex, ep.slug)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentEpisodeSlug === ep.slug ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
          >
            {ep.name}
          </button>
        ))}
      </div>
    </div>
  )
}
