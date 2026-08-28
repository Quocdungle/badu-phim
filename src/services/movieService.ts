import type { ApiDetailResponse, ApiListResponse } from '@/types'
import { normalizeDetailResponse, normalizeListResponse } from '@/utils/normalizers'
import apiClient from './apiClient'

export const movieService = {
  getLatestMovies: async (page = 1): Promise<ApiListResponse> => {
    const { data } = await apiClient.get('/api/films/phim-moi-cap-nhat', { params: { page } })
    return normalizeListResponse(data)
  },

  getMoviesByType: async (slug: string, page = 1): Promise<ApiListResponse> => {
    const { data } = await apiClient.get(`/api/films/danh-sach/${slug}`, { params: { page } })
    return normalizeListResponse(data)
  },

  searchMovies: async (keyword: string, page = 1): Promise<ApiListResponse> => {
    const { data } = await apiClient.get('/api/films/search', { params: { keyword, page } })
    return normalizeListResponse(data)
  },

  getMoviesByCategory: async (slug: string, page = 1): Promise<ApiListResponse> => {
    const { data } = await apiClient.get(`/api/films/the-loai/${slug}`, { params: { page } })
    return normalizeListResponse(data)
  },

  getMoviesByCountry: async (slug: string, page = 1): Promise<ApiListResponse> => {
    const { data } = await apiClient.get(`/api/films/quoc-gia/${slug}`, { params: { page } })
    return normalizeListResponse(data)
  },

  getMoviesByYear: async (year: number, page = 1): Promise<ApiListResponse> => {
    const { data } = await apiClient.get(`/api/films/nam-phat-hanh/${year}`, { params: { page } })
    return normalizeListResponse(data)
  },

  getMovieDetail: async (slug: string): Promise<ApiDetailResponse> => {
    const { data } = await apiClient.get(`/api/film/${slug}`)
    return normalizeDetailResponse(data)
  },
}
