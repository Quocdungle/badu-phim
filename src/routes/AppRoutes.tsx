import { CountryPage } from '@/pages/CountryPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { FilmsPage } from '@/pages/FilmsPage'
import { GenrePage } from '@/pages/GenrePage'
import { HistoryPage } from '@/pages/HistoryPage'
import { HomePage } from '@/pages/HomePage'
import { MovieDetailPage } from '@/pages/MovieDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SearchPage } from '@/pages/SearchPage'
import { WatchPage } from '@/pages/WatchPage'
import { YearPage } from '@/pages/YearPage'
import { Route, Routes } from 'react-router-dom'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/movies/category/:slug" element={<FilmsPage />} />
    <Route path="/movie/:slug" element={<MovieDetailPage />} />
    <Route path="/movie/:slug/watch" element={<WatchPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/genre/:slug" element={<GenrePage />} />
    <Route path="/country/:slug" element={<CountryPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="/history" element={<HistoryPage />} />
    <Route path="/year/:year" element={<YearPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)
