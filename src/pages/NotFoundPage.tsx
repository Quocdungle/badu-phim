import { MainLayout } from '@/components/layout/MainLayout'
import { Film } from 'lucide-react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => (
  <MainLayout>
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4">
      <Film className="w-16 h-16 text-gray-600" />
      <div>
        <h1 className="text-6xl font-bold text-white mb-2">404</h1>
        <p className="text-gray-400 text-lg">Trang bạn tìm kiếm không tồn tại.</p>
      </div>
      <Link to="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
        Về trang chủ
      </Link>
    </div>
  </MainLayout>
)
