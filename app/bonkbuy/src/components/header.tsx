import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {WalletButton} from '@/components/solana/solana-provider'

export default function Header() {
  return (
    <header className="bg-transparent">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/bonk.png"
            alt="BonkBuy Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-3xl font-extrabold text-white">
            Bonk<span className="text-yellow-300">Buy</span>
          </span>
        </Link>
        <nav>
        <div className="flex-none space-x-2">
          <WalletButton />
        </div>
        </nav>
      </div>
    </header>
  )
}

