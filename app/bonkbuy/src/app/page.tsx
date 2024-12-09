import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Header from './components/header'
import FeaturedDeals from './components/featured-deals'
import { Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <CallToAction />
        <FeaturedDeals />
      </main>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="text-center py-12">
      <h1 className="text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
        Bonk<span className="text-yellow-300">Buy</span>
      </h1>
      <p className="text-2xl text-white mb-6 animate-pulse">
        Where memes meet savings! Much wow! 🐕💸
      </p>
      <div className="flex justify-center space-x-4 mb-8">
        <StatCard title="Active Users" value="100+" emoji="🔥" />
        <StatCard title="Total Savings" value="$1,000,000+" emoji="💰" />
        <StatCard title="Active Deals" value="50+" emoji="🔥" />
      </div>
    </section>
  )
}

function StatCard({ title, value, emoji }: { title: string; value: string; emoji: string }) {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform">
      <h3 className="font-semibold text-lg text-white">{title}</h3>
      <p className="text-3xl font-bold text-yellow-300">{value}</p>
      <span className="text-4xl">{emoji}</span>
    </div>
  )
}

function CallToAction() {
  return (
    <section className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
      <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform">
        <Link href="/create-group">
          <Sparkles className="mr-2 h-5 w-5" />
          Start a Group Order
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform">
        <Link href="/trending-deals">Join Now</Link>
      </Button>
    </section>
  )
}

