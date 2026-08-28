import { ErrorState } from '@/components/common/ErrorState'
import { MainLayout } from '@/components/layout/MainLayout'
import { ContinueWatchingRow } from '@/components/movie/ContinueWatchingRow'
import { GenreQuickLinks } from '@/components/movie/GenreQuickLinks'
import { HeroSlider } from '@/components/movie/HeroSlider'
import { MovieCard } from '@/components/movie/MovieCard'
import { MovieGrid } from '@/components/movie/MovieGrid'
import { MovieRow } from '@/components/movie/MovieRow'
import { TopRankRow } from '@/components/movie/TopRankRow'
import { Pagination } from '@/components/ui/Pagination'
import { useLatestMovies, useMoviesByType } from '@/hooks/useMovies'
import { useFavoritesStore } from '@/stores/favoritesStore'
import type { FavoriteMovie, Movie } from '@/types'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Reveal = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
)

export const HomePage = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, refetch } = useLatestMovies(page)
  const { data: seriesData, isLoading: seriesLoading } = useMoviesByType('phim-bo', 1)
  const { data: filmData, isLoading: filmLoading } = useMoviesByType('phim-le', 1)
  const { data: tvData, isLoading: tvLoading } = useMoviesByType('tv-shows', 1)
  const { data: animeData, isLoading: animeLoading } = useMoviesByType('hoat-hinh', 1)
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()

  const handleFavoriteToggle = (movie: Movie) => {
    if (isFavorite(movie.slug)) {
      removeFavorite(movie.slug)
    } else {
      const fav: FavoriteMovie = {
        id: movie.id,
        slug: movie.slug,
        name: movie.name,
        poster_url: movie.poster_url,
        thumb_url: movie.thumb_url,
        year: movie.year,
        addedAt: new Date().toISOString(),
      }
      addFavorite(fav)
    }
  }

  return (
    <MainLayout>
      {data?.items?.length && !isLoading ? (
        <HeroSlider movies={data.items} isFavorite={isFavorite} onFavoriteToggle={handleFavoriteToggle} />
      ) : (
        <div className="w-full h-[70vh] min-h-[500px] bg-[#15151C] animate-pulse" />
      )}

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-10">
        <ContinueWatchingRow />

        <Reveal>
          <TopRankRow title="Top 10 hôm nay" movies={data?.items ?? []} loading={isLoading} />
        </Reveal>

        <Reveal>
          <GenreQuickLinks />
        </Reveal>

        <Reveal>
          <MovieRow
            title="Phim bộ nổi bật"
            movies={seriesData?.items ?? []}
            seeAllHref="/movies/category/phim-bo"
            loading={seriesLoading}
          />
        </Reveal>

        <Reveal>
          <MovieRow
            title="Phim lẻ nổi bật"
            movies={filmData?.items ?? []}
            seeAllHref="/movies/category/phim-le"
            loading={filmLoading}
          />
        </Reveal>

        <Reveal>
          <MovieRow
            title="TV Show nổi bật"
            movies={tvData?.items ?? []}
            seeAllHref="/movies/category/tv-shows"
            loading={tvLoading}
          />
        </Reveal>

        <Reveal>
          <MovieRow
            title="Hoạt hình nổi bật"
            movies={animeData?.items ?? []}
            seeAllHref="/movies/category/hoat-hinh"
            loading={animeLoading}
          />
        </Reveal>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">Phim mới cập nhật</h2>
          {data?.paginate && (
            <span className="text-gray-500 text-sm">{data.paginate.total_items.toLocaleString()} phim</span>
          )}
        </div>

        {isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : (
          <>
            <MovieGrid loading={isLoading}>
              {data?.items?.map((movie) => <MovieCard key={movie.slug} movie={movie} />)}
            </MovieGrid>
            {data?.paginate && (
              <Pagination currentPage={data.paginate.current_page} totalPage={data.paginate.total_page} onPageChange={setPage} />
            )}
          </>
        )}
      </div>
    </MainLayout>
  )
}

