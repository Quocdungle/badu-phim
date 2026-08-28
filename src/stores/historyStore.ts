import type { WatchHistory } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX_HISTORY = 50

interface HistoryState {
  history: WatchHistory[]
  addHistory: (entry: WatchHistory) => void
  removeHistory: (movieSlug: string) => void
  clearAll: () => void
  getLastWatched: (movieSlug: string) => WatchHistory | undefined
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      addHistory: (entry) =>
        set((state) => {
          const filtered = state.history.filter((h) => h.movieSlug !== entry.movieSlug)
          return { history: [entry, ...filtered].slice(0, MAX_HISTORY) }
        }),
      removeHistory: (movieSlug) =>
        set((state) => ({
          history: state.history.filter((h) => h.movieSlug !== movieSlug),
        })),
      clearAll: () => set({ history: [] }),
      getLastWatched: (movieSlug) =>
        get().history.find((h) => h.movieSlug === movieSlug),
    }),
    { name: 'phim-history' }
  )
)
