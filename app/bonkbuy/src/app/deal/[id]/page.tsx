"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChevronLeft } from "lucide-react";

// Mock Deals Data
const mockDeals = [
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
    details:
      "These headphones are equipped with bonk-level noise cancellation technology to block out distractions. Perfect for focusing on your music or work.",
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
    details:
      "Experience stunning visuals with this Doge-Approved 4K Smart TV. With cutting-edge HDR support, every detail comes to life.",
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
    details:
      "The Bonk Vacuum of the Future comes with AI-powered cleaning and multi-surface compatibility for effortless cleaning.",
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
    tag: "🎧 New Arrival",
    details:
      "Wireless, seamless, and crystal-clear sound! These Bonk Wireless Airpods redefine your listening experience.",
  },
];

export default function DealPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  // Find the deal based on the provided ID
  const deal = mockDeals.find((d) => d.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const maxAvailable = deal ? deal.maximum - deal.progress : 0;

  // Handle "Buy Now" functionality
  const handleBuyNow = () => {
    if (quantity < 1 || quantity > maxAvailable) {
      alert("Invalid quantity selected.");
      return;
    }
    console.log(`Purchasing ${quantity} units of ${deal?.name}`);
    // You can redirect to a checkout page or process the purchase here
  };

  // Handle case where deal is not found
  if (!deal) {
    return (
      <div className="text-center text-yellow-500 py-20">
        <h1 className="text-4xl font-bold">Deal Not Found</h1>
        <button
          onClick={() => router.push("/")}
          className="text-yellow-300 underline mt-4"
        >
          Go Back to Deals
        </button>
      </div>
    );
  }
  return (
    <section className="max-w-4xl mx-auto bg-yellow-100 bg-opacity-90 backdrop-blur-lg rounded-lg p-6 shadow-lg text-yellow-700">
      {/* Back to Deals Button */}
      <div className="mb-6">
        <Button
          onClick={() => router.push("/")}
          className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-bold py-2 px-4 rounded"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to All Deals
        </Button>
      </div>

      {/* Product Image and Tag */}
      <div className="relative mb-4">
        <Image
          src={deal.image}
          alt={deal.name}
          width={800}
          height={400}
          className="w-full h-96 object-cover rounded-lg border-4 border-yellow-500"
        />
        <Badge className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 font-bold">
          {deal.tag}
        </Badge>
      </div>

      {/* Product Information */}
      <h1 className="text-3xl font-extrabold mb-4">{deal.name}</h1>
      <p className="text-yellow-600 mb-6">{deal.description}</p>
      <p className="text-lg mb-4">{deal.details}</p>

      {/* Deal Progress and Time Remaining */}
      <div className="flex justify-between text-sm mb-6">
        <span className="flex items-center">
          <Users className="mr-1 h-4 w-4 text-yellow-600" />
          {deal.progress}/{deal.target} (Max: {deal.maximum})
        </span>
        <span className="flex items-center">
          <Clock className="mr-1 h-4 w-4 text-yellow-600" />
          {deal.timeRemaining}
        </span>
      </div>

      {/* Quantity Input and Buy Now Button */}
      <div className="mt-6">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-yellow-700 mb-2"
        >
          Enter Amount:
        </label>
        <Input
          id="quantity"
          type="number"
          min="1"
          max={maxAvailable}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-32"
          disabled={maxAvailable === 0}
        />
      </div>
      <Button
        onClick={handleBuyNow}
        className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-bold py-2 px-4 rounded"
        disabled={maxAvailable === 0}
      >
        {maxAvailable === 0 ? "Sold Out" : "Buy Now"}
      </Button>
    </section>
  );
}
export const runtime = 'edge' // 'nodejs' (default) | 'edge'