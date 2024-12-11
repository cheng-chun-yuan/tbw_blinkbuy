import Header from '@/components/header'
import FeaturedDeals from '@/components/featured-deals'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <FeaturedDeals />
      </main>
    </div>
  )
}
export const runtime = 'edge' // 'nodejs' (default) | 'edge'



