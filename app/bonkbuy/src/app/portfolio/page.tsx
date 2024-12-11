"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from 'react'
import {
  clusterApiUrl,
  Connection,
  PublicKey,
} from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import { useWallet } from '@solana/wallet-adapter-react'
import BlinkbuyJson from "@/app/idl/blinkbuy.json";
import { type Blinkbuy} from "@/app/idl/blinkbuy";

import {dealsData} from "@/lib/utils"

export default function MyOrdersPage() {
  const wallet = useWallet()
  const [myGroupOrders, setMyGroupOrders] = useState<Array<{
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

  const [myGroupRequests, setMyGroupRequests] = useState<Array<{
    id: number;
    name: string;
    amount: number;
    timeRemaining: string;
    image: string;
  }>>([]);
  useEffect(() => {
    const fetchDeals = async () => {
      const connection = new Connection(clusterApiUrl('devnet'), {
        commitment: "confirmed",
      });
      const program = new Program<Blinkbuy>(BlinkbuyJson as Blinkbuy, {connection});
      const group_orders = await program.account.groupOrder.all();
      const newDeals: typeof myGroupOrders = [];
      group_orders.forEach((group) => {
        const group_order = group.account;
        // if (group_order.manager != wallet.publicKey) return
        const dealData = dealsData[Number(group_order.numProduct)];
        const plan = dealData.plans[Number(group_order.numRequirement)];
        if (plan) {
          // Changed from myGroupOrders.push to newDeals.push
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
      setMyGroupOrders(newDeals); // This will now contain the new orders
  
      const group_requests = await program.account.groupRequest.all();
      const newOrders: typeof myGroupRequests = [];
      // Changed to for...of to handle async operations properly
      for (const group of group_requests) {
        const group_request = group.account;
        // if (group_request.buyer != wallet.publicKey) return
        const group_order = new PublicKey(group_request.groupOrder);
        const group_order_account = await program.account.groupOrder.fetch(group_order);
        const dealData = dealsData[Number(group_order_account.numProduct)];
        if (group_order_account) {
          // Changed from myGroupRequests.push to newOrders.push
          newOrders.push({
            id: newOrders.length,
            name: dealData.name,
            timeRemaining: "4d 5h",
            amount: Number(group_request.amount),
            image: dealData.image,
          });
        }
      }
      setMyGroupRequests(newOrders);
    };
    
    fetchDeals();
  }, [wallet.publicKey]); // Added wallet.publicKey as dependency
  // In a real application, you would fetch this data from an API
  // const myOrders = [
  //   { id: 1, name: "Bonk-Cancelling Headphones", date: "2023-05-15", status: "failed" },
  //   { id: 2, name: "Doge-Approved 4K Smart TV", date: "2023-06-01", status: "Processing" },
  // ]

  // const myGroupOrders = [
  //   { id: 1, name: "Bonk Vacuum of the Future", date: "2023-05-20", participants: 30, status: "Active" },
  //   { id: 2, name: "Dogecoin Mining Rig", date: "2023-06-10", participants: 50, status: "Completed" },
  // ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">My Orders</h1>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="personal">Personal Orders</TabsTrigger>
          <TabsTrigger value="group">Group Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myGroupRequests.map((order) => (
              <Card key={order.id} className="bg-white bg-opacity-10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">{order.name}</CardTitle>
                  <CardDescription className="text-white/70">Remain : {order.timeRemaining}</CardDescription>
                  <CardDescription className="text-white/70">Order Amount: {order.amount}</CardDescription>
                </CardHeader>
                {/* <CardContent>
                  <Badge variant={order.status === "Delivered" ? "default" : "secondary"} className="bg-yellow-400 text-black">
                    {order.status}
                  </Badge>
                </CardContent> */}
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="group">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myGroupOrders.map((order) => (
              <Card key={order.id} className="bg-white bg-opacity-10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">{order.name}</CardTitle>
                  {/* <CardDescription className="text-white/70">Created on: {order.date}</CardDescription> */}
                  <CardDescription className="text-white/70">Remain : {order.timeRemaining}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-white">Current Amount: {order.progress}</p>
                  <Badge variant={order.tag === "Active" ? "default" : "secondary"} className="bg-green-400 text-black">
                    {order.tag}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

