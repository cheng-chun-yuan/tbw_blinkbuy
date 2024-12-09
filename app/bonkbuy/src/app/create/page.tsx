import { CreateGroupPurchase } from '@/components/create-group-purchase'
import Image from 'next/image'

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
    </div>
  )
}

