"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChevronLeft } from "lucide-react";
import {useConnection, useAnchorWallet} from '@solana/wallet-adapter-react'
import {
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import BlinkbuyJson from "@/app/idl/blinkbuy.json";
import { type Blinkbuy} from "@/app/idl/blinkbuy";
import {
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { dealsData } from "@/lib/utils";
export default function DealPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  // Find the deal based on the provided ID
  // const deal = mockDeals.find((d) => d.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { connection } = useConnection()
  const program = new Program<Blinkbuy>(BlinkbuyJson as Blinkbuy, {connection});
  const wallet = useAnchorWallet()
  const group_order_account = new PublicKey(id);
  useEffect(() => {
    async function fetchDeal() {
      try {
        const group_order = await program.account.groupOrder.fetch(group_order_account);
        const dealData = dealsData[Number(group_order.numProduct)];
        const plan = dealData.plans[Number(group_order.numRequirement)];
        
        setDeal({
          name: dealData.name,
          description: dealData.description,
          image: dealData.image,
          progress: Number(group_order.currentAmount),
          details: dealData.details,
          target: plan.min,
          maximum: plan.max,
          timeRemaining: "2d 5h",
          group_order: id,
          tag: dealData.tag,
        });
      } catch (error) {
        console.error('Error fetching deal:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDeal();
  }, [id]);
  const maxAvailable = deal ? deal.maximum - deal.progress : 0;

  // Handle "Buy Now" functionality
  const handleBuyNow = async () => {
    if (quantity < 1 || quantity > maxAvailable) {
      alert("Invalid quantity selected.");
      return;
    }
    if(!wallet) return ;
    if(!wallet.publicKey) return ;
    const mintBonk = new PublicKey("Aqk2sTGwLuojdYSHDLCXgidGNUQeskWS2JbKXPksHdaG")
    const group_request = PublicKey.findProgramAddressSync(
      [Buffer.from("group_request"), group_order_account.toBuffer(), wallet.publicKey.toBuffer()],
      program.programId
    )[0];
    const buyerAta = getAssociatedTokenAddressSync(mintBonk, wallet.publicKey, false, TOKEN_2022_PROGRAM_ID)
    const vaultGroupOrder = getAssociatedTokenAddressSync(mintBonk, group_order_account, true, TOKEN_2022_PROGRAM_ID)
    await program.methods
      .buyProduct(new BN(quantity))
      .accountsStrict({
        buyer: wallet.publicKey,
        currency: mintBonk,
        groupOrder: group_order_account,
        buyerAta,
        vaultGroupOrder,
        groupRequest: group_request,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId
      })
      .rpc()
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