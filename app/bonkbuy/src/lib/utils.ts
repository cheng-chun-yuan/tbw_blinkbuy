import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const dealsData = [
  {
    id: 0,
    name: "Bonk-Cancelling Headphones",
    description: "Silence the cats, embrace the bonks! 🎧🐕",
    image: "/headphone.webp",
    minprice: 50000,
    maxprice: 70000,
    productPublicKey: "Cug1HN893gNm9o5DHGxAcn6gZEGBWsNzxQfdAKQ7bVxE",
    tag: "🔥 Hot Deal",
    details:
      "These headphones are equipped with bonk-level noise cancellation technology to block out distractions. Perfect for focusing on your music or work.",
    plans: [
      { id: 0, min: 5, max: 10, price: 70000, price_requirement: "Cymgd75S6L8gMnHAGzF9QLqZHLmSvK9fo3GLvY2wLifA"},
      { id: 1, min: 10, max: 20, price: 60000, price_requirement: "GCLrBCJMGzDbRgoEioUmAf83JAiKT4VmKnzqStgWzmcS" },
      { id: 2, min: 20, max: 50, price: 50000, price_requirement: "GvKFkApvVfXeWuYRsXjMpvGubNAFsEqJs9L8XuVoxznt" },
    ],
  },
  {
    id: 1,
    name: "Doge-Approved 4K Smart TV",
    description: "So sharp, you can see the moon from here! 📺🌕",
    image: "/smartTV.webp",
    minprice: 120000,
    maxprice: 150000,
    productPublicKey: "21iPKb6vYaut5CD63FvZ3NLedgE5bKd4VypsQL6KVB8a",
    tag: "👀 Almost Gone",
    details:
      "Experience stunning visuals with this Doge-Approved 4K Smart TV. With cutting-edge HDR support, every detail comes to life.",
    plans: [
      { id: 0, min: 5, max: 10, price: 150000, price_requirement: "JDAcx7BLpECdzgws3Rm6xxEuuGYDxbXmaBPrC8DcgKKy" },
      { id: 1, min: 10, max: 20, price: 140000, price_requirement: "JDgHh2Yvr8P7VHEUNn3pXRukcS2FMTTdAfTsDjkf6GKh" },
      { id: 2, min: 50, max: 60, price: 120000, price_requirement: "EScX6NnwTnyDpx5V5nYJb2v2yCTSayMcbY37dYDMKfFa" },
    ],
  },
  {
    id: 2,
    name: "Bonk Vacuum of the Future",
    description: "It bonks the dirt away! 🤖🐾",
    image: "/vacuum.webp",
    minprice: 8000000,
    maxprice: 12000000,
    productPublicKey: "Ed1H8STxNakZrxjZjozLmyCriRGSc1UrPTRg4iS2FNNf",
    tag: "🆕 Just Launched",
    details:
      "The Bonk Vacuum of the Future comes with AI-powered cleaning and multi-surface compatibility for effortless cleaning.",
    plans: [
      { id: 0, min: 20, max: 30, price: 8000000, price_requirement: "FCvhgGwgVd9EPqPp9EhHaNQzPXPcQdNhZPh9rpMch8Sz" },
      { id: 1, min: 5, max: 10, price: 9500000, price_requirement: "BQ37yzVawkpJoF6j2RyhtNhbHdhmYGVcU4rSiXbohUBX"  },
      { id: 2, min: 2, max: 5, price: 12000000, price_requirement: "5zvQ9PPmanB7FiZhY1rjM7Ks6Jbu3BqCs3RGPmwe9AZZ"  },
    ],
  },
  {
    id: 3,
    name: "Bonk Wireless Airpods",
    description: "Listen to the world! 🤖🐾",
    image: "/airpods.webp",
    minprice: 50000,
    maxprice: 70000,
    productPublicKey: "Cz3ENAdv6dhgpusMz5ZNb4qUCwxErq4GfwUHcj4ufneh",
    tag: "🆕 Just Launched",
    details:
      "Wireless, seamless, and crystal-clear sound! These Bonk Wireless Airpods redefine your listening experience.",
    plans: [
      { id: 0, min: 5, max: 10, price: 50000, price_requirement: "EeiMHDbSQEZohSkYc9Ed8XQTEb5heQUqzuT1GeK5qCJT" },
      { id: 1, min: 10, max: 20, price: 60000, price_requirement: "5aRePtvV8B2g2KsJuP7vAwJ4Dj31jfB6vDPXP9dWcMNw" },
      { id: 2, min: 20, max: 50, price: 70000, price_requirement: "44cKiY24WNucUHfhrxJqeDiyfLR44aHWywPpNA97Tqse" },
    ],
  },
  {
    id: 4,
    name: "Bonk smart watch",
    description: "Bring you the future technology! 🤖🐾",
    image: "/smartwatch.webp",
    minprice: 30000,
    maxprice: 60000,
    productPublicKey: "C2QBvBZ5t47Bvya6Gh8GGbwTb4LFCoV1iiP7eJPgP39G",
    tag: "🆕 Just Launched",
    details:
      "Track your life with style! The Bonk Smart Watch combines cutting-edge technology with sleek design for the ultimate wearable experience.",
    plans: [
      { id: 0, min: 100, max: 150, price: 30000, price_requirement: "HgcLuxgeeKGAKqLtgyfxnARd9Wh9dN2QCpB8WJHGyo4Z" },
      { id: 1, min: 20, max: 50, price: 50000, price_requirement: "5MaKKKnaE5tP37Rgp7raBVPVPgkftsyqZHLUmp68Xfm" },
      { id: 2, min: 10, max: 20, price: 60000, price_requirement: "HQoBMzDZFkTCcHFnCh1Zd742jh4F1beoeye5LASs5pP3" },
    ],
  },
]