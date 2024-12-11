'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from "@/hooks/use-toast"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, ChevronLeft, Bone } from 'lucide-react';
import Image from 'next/image';
import { dealsData } from '@/lib/utils';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Program, Idl, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import BlinkbuyJson from "@/app/idl/blinkbuy.json";
import { type Blinkbuy} from "@/app/idl/blinkbuy";
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { BN } from 'bn.js';

// Predefined Products and Plans
const predefinedProducts = dealsData

export function CreateGroupPurchase() {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(predefinedProducts[0]);
  const [selectedPlan, setSelectedPlan] = useState(selectedProduct.plans[0]);
  const [groupPurchase, setGroupPurchase] = useState({
    startTime: '',
    duration: 24,
  });
  const [shareableLink, setShareableLink] = useState('');
  const { toast } = useToast()
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  if (!wallet) return 
  const provider = new AnchorProvider(connection, wallet  , {});
  setProvider(provider);
  const program = new Program(BlinkbuyJson as Blinkbuy, provider);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast({
        description: "Link copied to clipboard!",
      });
    } catch (err) {
      toast({
        description: "Failed to copy link.",
        variant: "destructive",
      });
    }
  };

  const handlePublish = async () => {
    const manager_refund = new BN(5)
    const startTimestamp = Math.floor(new Date(groupPurchase.startTime).getTime() / 1000)
    console.log(startTimestamp)
    const start_time = new BN(startTimestamp)
    const expired_time = new BN(startTimestamp+ groupPurchase.duration * 3600)
    const priceRequirement = new PublicKey(selectedPlan.price_requirement)
    const product = new PublicKey(selectedProduct.productPublicKey)
    const storeOwner= new PublicKey("FSPvMFYQqPsYyhoLAtmj4fc6vNp5UWteviSPcKr9KnQ5")
    const store = PublicKey.findProgramAddressSync(
      [Buffer.from("store"), storeOwner.toBuffer()],
      program.programId
    )[0];
    const groupManagerCertificate = PublicKey.findProgramAddressSync(
      [Buffer.from("store"), store.toBuffer(), wallet.publicKey.toBuffer()],
      program.programId
    )[0];
    const group_manager_certificate = await program.account.groupManagerCertificate.fetch(groupManagerCertificate)
    const orderIndex = new BN(group_manager_certificate.numOrder)
    const groupOrder = PublicKey.findProgramAddressSync(
      [Buffer.from("group_order"), wallet.publicKey.toBuffer(), orderIndex.toArrayLike(Buffer, "le", 8)],
      program.programId
    )[0];
    const success = await program.methods
      .createGroupOrder(manager_refund, start_time, expired_time)
      .accountsStrict({
        manager: wallet.publicKey,
        storeOwner,
        product,
        priceRequirement,
        store,
        groupManagerCertificate,
        groupOrder,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
    toast({
      description: "Your purchase has been sent successful.",
    })
    const link = `https://dial.to/?action=solana-action:https://tbw-blinkbuy.pages.dev/api/buy/${groupOrder.toString()}`;
    setShareableLink(link);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-orange-100 to-yellow-200 border-4 border-orange-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-orange-700">Create Group Purchase - Such Wow!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative">
                <Bone className={`w-12 h-12 ${i <= step ? 'text-orange-500' : 'text-gray-500'}`} />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                  {i}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center text-sm font-medium">Step {step} of 4 - Much Progress!</div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">1. Select Product</h3>
            <Select
              value={selectedProduct.id.toString()}
              onValueChange={(value) => {
                const newProduct = predefinedProducts.find((p) => p.id === parseInt(value))!;
                setSelectedProduct(newProduct);
                setSelectedPlan(newProduct.plans[0]); // Reset to the first plan of the new product
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a product" />
              </SelectTrigger>
              <SelectContent>
                {predefinedProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} - ${product.minprice} ~ {product.maxprice}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-4 mt-4">
              <Image src={selectedProduct.image} alt={selectedProduct.name} width={64} height={64} className="rounded" />
              <div>
                <p className="font-semibold">{selectedProduct.name}</p>
                <p>${selectedProduct.minprice} ~ {selectedProduct.maxprice}</p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">2. Choose Plan</h3>
            <Select
              value={selectedPlan.id.toString()}
              onValueChange={(value) =>
                setSelectedPlan(selectedProduct.plans.find((plan) => plan.id === parseInt(value))!)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a plan" />
              </SelectTrigger>
              <SelectContent>
                {selectedProduct.plans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id.toString()}>
                    {plan.min}-{plan.max} participants: ${plan.price} per unit
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="p-4 bg-gray-100 rounded-md">
              <p><strong>Participants:</strong> {selectedPlan.min}-{selectedPlan.max}</p>
              <p><strong>Price per Unit:</strong> ${selectedPlan.price}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <input
                type="datetime-local"
                id="startTime"
                value={groupPurchase.startTime}
                onChange={(e) => setGroupPurchase({ ...groupPurchase, startTime: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (hours)</Label>
              <Slider
                id="duration"
                min={1}
                max={72}
                step={1}
                value={[groupPurchase.duration]}
                onValueChange={(value) => setGroupPurchase({ ...groupPurchase, duration: value[0] })}
              />
              <div className="text-sm text-gray-500">{groupPurchase.duration} hours</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">3. Review and Publish</h3>
            <div className="p-4 bg-gray-100 rounded-md">
              <h4 className="font-semibold mb-2">Order Summary</h4>
              <p><strong>Product:</strong> {selectedProduct.name}</p>
              <p><strong>Price per Unit:</strong> ${selectedPlan.price}</p>
              <p><strong>Participants:</strong> {selectedPlan.min}-{selectedPlan.max}</p>
              <p><strong>Start Time:</strong> {groupPurchase.startTime || 'Not set'}</p>
              <p><strong>Duration:</strong> {groupPurchase.duration} hours</p>
            </div>
            <Button onClick={handlePublish} className="w-full">Publish Group Order</Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">4. Generate and Share Link</h3>
            <Button onClick={handleCopyLink} disabled={shareableLink==''} className="w-full">Copy Shareable Link</Button>
            {shareableLink && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <p><strong>Shareable Link:</strong> <a href={shareableLink} className="text-blue-500 underline">{shareableLink}</a></p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button onClick={handlePrev} variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
        )}
        {step < 4 && (
          <Button onClick={handleNext} className="ml-auto bg-orange-500 hover:bg-orange-600 text-white">
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}