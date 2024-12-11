"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from 'lucide-react'
import {
  clusterApiUrl,
  Connection,
} from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { dealsData } from '@/lib/utils'

import BlinkbuyJson from "@/app/idl/blinkbuy.json";
import { type Blinkbuy} from "@/app/idl/blinkbuy";
export default function FeaturedDeals() {
  
  const [deals, setDeals] = useState<Array<{
    id: number;
    name: string;
    description: string;
    image: string;
    progress: number;
    target: number;
    maximum: number;
    timeRemaining: string;
    group_order: string;
    tag: string;
  }>>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const connection = new Connection(clusterApiUrl('devnet'), {
        commitment: "confirmed",
      });
      const program = new Program<Blinkbuy>(BlinkbuyJson as Blinkbuy, {connection});
      const group_orders = await program.account.groupOrder.all();
      
      const newDeals: typeof deals = [];
      group_orders.forEach((group) => {
        const group_order = group.account;
        const dealData = dealsData[Number(group_order.numProduct)];
        const plan = dealData.plans[Number(group_order.numRequirement)];
        if (plan) {
          newDeals.push({
            id: newDeals.length,
            name: dealData.name,
            description: dealData.description,
            image: dealData.image,
            progress: Number(group_order.currentAmount),
            target: plan.min,
            maximum: plan.max,
            timeRemaining: "2d 5h",
            group_order: group.publicKey.toBase58(),
            tag: dealData.tag,
          });
        }
      });
      
      setDeals(newDeals);
    };
    fetchDeals();
  }, []);


  return (
    <section>
      <h2 className="text-4xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
        🚀 Trending Bonk Deals 🐕
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal) => (
          <Link href={`/deal/${deal.group_order}`} key={deal.group_order} className="block">
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
