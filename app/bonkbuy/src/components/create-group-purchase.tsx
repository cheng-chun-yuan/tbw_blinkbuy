'use client';
import { useAnchorWallet} from '@solana/wallet-adapter-react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, ChevronLeft, Bone } from 'lucide-react';
import Image from 'next/image';


// Predefined Products and Plans
const predefinedProducts = [
  {
    id: 0,
    productPublicKey: "3d7w1o6Xvhf4MQN7Ah1FkSFR7KYC7z4ctUF2xf2qbL4M",
    name: "Bonk-Cancelling Headphones",
    minprice: 50,
    maxprice: 70,
    image: "/headphone.webp",
    plans: [
      { id: 1, min: 5, max: 10, price: 70, price_requirement: "9Un2KYAjsGYAgJj8BDZcSkt4stE2Lcscy6nkCNYnYodi"},
      { id: 2, min: 10, max: 20, price: 60, price_requirement: "GaLMGbcQEajQBXD92j3WEWexJ3xQU3QrAEXCvQgyAa2y" },
      { id: 3, min: 20, max: 50, price: 50, price_requirement: "4Q2C7BGzqF1q79UtWABuyDpEDfa74PVP7yN2NGo9wsjp" },
    ],
  },
  {
    id: 1,
    productPublicKey: "9XJ4ZUpMcHS1rXL6HNdatgEVgNvCGiMmKHNdP8h56wLx",
    name: "Doge-Approved 4K Smart TV",
    minprice: 120,
    maxprice: 150,
    image: "/smartTV.webp",
    plans: [
      { id: 1, min: 5, max: 10, price: 150, price_requirement: "D1ksk9iD5APzkFFk1ExZ8gpGuLRFFwTqpn8M553Xdg6J" },
      { id: 2, min: 10, max: 20, price: 140, price_requirement: "Chkp6MxtyVh5L7Bv9t8zLTajiiaR1HoGbPGAxX387df2" },
      { id: 3, min: 50, max: 60, price: 120, price_requirement: "GjzwCpGb6jaMdPgYvtU8jujgNvK4UuoDgGTsUsCwgP9z" },
    ],
  },
  {
    id: 2,
    productPublicKey: "741y9KUM99YXwMaNm4cLge7y42p1eRQ3Xoc8BX6SZX3P",
    name: "Doge-Approved 4K Smart TV",
    minprice: 8000,
    maxprice: 12000,
    image: "/smartTV.webp",
    plans: [
      { id: 1, min: 20, max: 30, price: 8000, price_requirement: "52Rn3VENfVCEujftWw2no4ev6ddrfrN1ZBYmzaAj3b9n" },
      { id: 2, min: 5, max: 10, price: 9500, price_requirement: "ArVUz3rigzp2o1f813dWvCCZR9eMrCBxjNuVHDPrSbdb"  },
      { id: 3, min: 2, max: 5, price: 12000, price_requirement: "3t7XiohCjVbzF9HkezUqoavkmtQDjsc53YgM9dDiAjyy"  },
    ],
  },
  {
    id: 3,
    productPublicKey: "62tyXkgyYehAwMJDwBn7XMWxjBvA44XbCPyaQx95fTJX",
    name: "Bonk Vacuum of the Future",
    minprice: 50,
    maxprice: 70,
    image: "/vacuum.webp",
    plans: [
      { id: 1, min: 5, max: 10, price: 50, price_requirement: "8yqB3Ln5vnMBRSzdGUMtgEMADVEkQgn1zNECxPf9MLzj" },
      { id: 2, min: 10, max: 20, price: 60, price_requirement: "rqFqCjVyr6pEvjZ6SH7DLZoUsYPkr4EJBofUn2bdrEu" },
      { id: 3, min: 20, max: 50, price: 70, price_requirement: "E3bGpjLF1nVSJdzECHBu9ekv2QwozQX5WP9zzdQAbsBR" },
    ],
  },
  {
    id: 4,
    productPublicKey: "GUjYxGGjKnWF7FvnuRgfnGULwrAezDeqDkP84sL9sEAB",
    name: "Bonk Wireless Airpods",
    minprice: 30,
    maxprice: 60,
    image: "/airpods.webp",
    plans: [
      { id: 1, min: 100, max: 150, price: 30, price_requirement: "5Rj3p2cNrHNhd9WUYL3AAzBbRchGi5eitfScBPawFeNZ" },
      { id: 2, min: 20, max: 50, price: 50, price_requirement: "G5kk42ytDP4dviiTrWk4V89M9DKcj654gLVPaQUhzbRU" },
      { id: 3, min: 10, max: 20, price: 60, price_requirement: "6uY5qj7oF2RBCBin8g4i8fmDww4HaX2UmYrTWwsfDiL5" },
    ],
  },
];



export function CreateGroupPurchase() {
  const wallet = useAnchorWallet()
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(predefinedProducts[0]);
  const [selectedPlan, setSelectedPlan] = useState(selectedProduct.plans[0]);
  const [groupPurchase, setGroupPurchase] = useState({
    startTime: '',
    duration: 24,
  });
  const [shareableLink, setShareableLink] = useState('');

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleGenerateLink = () => {
    const link = `https://example.com/group-purchase/${Math.random().toString(36).substring(7)}`;
    setShareableLink(link);
  };

  const handlePublish = async () => {
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
            <Button onClick={handleGenerateLink} className="w-full">Generate Shareable Link</Button>
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