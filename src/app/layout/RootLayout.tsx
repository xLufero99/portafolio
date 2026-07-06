import { Outlet } from 'react-router-dom'
import { Header } from '@/app/components/common/Header'
import { Footer } from '@/app/components/common/Footer'

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}