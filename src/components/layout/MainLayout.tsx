import { Footer } from './Footer'
import { Header } from './Header'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="min-h-screen flex flex-col bg-[#0B0B0F]">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
)
