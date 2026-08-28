import { Link } from 'react-router-dom'

const QUICK_GENRES = [
  { name: 'Hành Động', slug: 'hanh-dong', gradient: 'from-red-600 to-orange-500' },
  { name: 'Tình Cảm', slug: 'tinh-cam', gradient: 'from-pink-600 to-rose-500' },
  { name: 'Hài Hước', slug: 'hai-huoc', gradient: 'from-amber-500 to-yellow-400' },
  { name: 'Kinh Dị', slug: 'kinh-di', gradient: 'from-slate-700 to-slate-500' },
  { name: 'Cổ Trang', slug: 'co-trang', gradient: 'from-amber-700 to-amber-500' },
  { name: 'Khoa Học Viễn Tưởng', slug: 'khoa-hoc-vien-tuong', gradient: 'from-cyan-600 to-blue-500' },
  { name: 'Phiêu Lưu', slug: 'phieu-luu', gradient: 'from-emerald-600 to-teal-500' },
  { name: 'Hoạt Hình', slug: 'hoat-hinh-the-loai', gradient: 'from-fuchsia-600 to-purple-500' },
]

export const GenreQuickLinks = () => (
  <section className="mb-10">
    <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Khám phá theo thể loại</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {QUICK_GENRES.map((g) => (
        <Link
          key={g.slug}
          to={`/genre/${g.slug}`}
          className={`bg-gradient-to-br ${g.gradient} rounded-xl px-3 py-5 text-center text-white font-semibold text-sm shadow-lg hover:scale-105 transition-transform duration-200`}
        >
          {g.name}
        </Link>
      ))}
    </div>
  </section>
)
