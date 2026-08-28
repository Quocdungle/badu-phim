import type { FavoriteMovie } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favorites: FavoriteMovie[]
  addFavorite: (movie: FavoriteMovie) => void
  removeFavorite: (slug: string) => void
  isFavorite: (slug: string) => boolean
  clearAll: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => ({
          favorites: [movie, ...state.favorites.filter((f) => f.slug !== movie.slug)],
        })),
      removeFavorite: (slug) =>
        set((state) => ({ favorites: state.favorites.filter((f) => f.slug !== slug) })),
      isFavorite: (slug) => get().favorites.some((f) => f.slug === slug),
      clearAll: () => set({ favorites: [] }),
    }),
    { name: 'phim-favorites' }
  )
)
