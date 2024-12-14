import { CreateGroupPurchase } from '@/components/create-group-purchase'
import Image from 'next/image'
import Link from 'next/link'

export default function CreateGroupPurchasePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-8">
        <Image 
          src="/bonk.png" 
          alt="Doge" 
          width={100} 
          height={100} 
          className="mx-auto rounded-full "
        />
        <h1 className="text-3xl font-bold mt-4 text-orange-700">
          Create a Group Purchase - Much Savings!
        </h1>
        <p className="text-orange-600 mt-2">Wow! Such deals! Very group buy!</p>
      </div>
      <CreateGroupPurchase />
      <div className="text-center mt-8">
        <Link href="/" passHref>
          <span className="inline-block bg-orange-700 text-white py-2 px-4 rounded-md hover:bg-orange-800">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  )
}