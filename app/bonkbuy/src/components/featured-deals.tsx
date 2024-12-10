import Image from 'next/image'
import Link from 'next/link'
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from 'lucide-react'

export default function FeaturedDeals() {
  const deals = [
    {
      id: 1,
      name: "Bonk-Cancelling Headphones",
      description: "Silence the cats, embrace the bonks! 🎧🐕",
      image: "/headphone.webp",
      progress: 40,
      target: 50,
      maximum: 70,
      timeRemaining: "2d 5h",
      tag: "🔥 Hot Deal",
    },
    {
      id: 2,
      name: "Doge-Approved 4K Smart TV",
      description: "So sharp, you can see the moon from here! 📺🌕",
      image: "/smartTV.webp",
      progress: 75,
      target: 100,
      maximum: 120,
      timeRemaining: "4d 12h",
      tag: "👀 Almost Gone",
    },
    {
      id: 3,
      name: "Bonk Vacuum of the Future",
      description: "It bonks the dirt away! 🤖🐾",
      image: "/vacuum.webp",
      progress: 30,
      target: 80,
      maximum: 100,
      timeRemaining: "1d 8h",
      tag: "🆕 Just Launched",
    },
    {
      id: 4,
      name: "Bonk Wireless Airpods",
      description: "Listen to the world! 🤖🐾",
      image: "/airpods.webp",
      progress: 200,
      target: 180,
      maximum: 250,
      timeRemaining: "1d 8h",
      tag: "🆕 Just Launched",
    },
  ]

  return (
    <section>
      <h2 className="text-4xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
        🚀 Trending Bonk Deals 🐕
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <Link href={`/deal/${deal.id}`} key={deal.id} className="block">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform">
              <div className="relative">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-yellow-400 text-black font-bold">
                  {deal.tag}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2 text-white">{deal.name}</h3>
                <p className="text-yellow-300 mb-4">{deal.description}</p>
                <Progress
                  value={(deal.progress / deal.maximum) * 100}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-white">
                  <span className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {deal.progress}/{deal.target} (Max: {deal.maximum})
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {deal.timeRemaining}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
