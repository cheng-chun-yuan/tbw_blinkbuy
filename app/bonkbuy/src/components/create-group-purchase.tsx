'use client'

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Slider } from "@/components/ui/slider"
// import { Switch } from "@/components/ui/switch"
// import Image from 'next/image'
// import { ChevronRight, ChevronLeft, Upload, Zap } from 'lucide-react'
// import { Bone } from 'lucide-react'

// // Mock function for handling file upload
// const handleFileUpload = (file: File) => {
//   console.log('File uploaded:', file.name)
//   // In a real application, you would handle the file upload here
//   return URL.createObjectURL(file)
// }

// // Mock function for generating a shareable link
// const generateShareableLink = (groupPurchase: any) => {
//   // In a real application, you would generate a unique link here
//   return `https://example.com/group-purchase/${Math.random().toString(36).substring(7)}`
// }

// export function CreateGroupPurchase() {
//   const [step, setStep] = useState(1)
//   const [groupPurchase, setGroupPurchase] = useState({
//     productName: '',
//     productImage: '',
//     productPrice: 0,
//     productDescription: '',
//     minParticipants: 5,
//     maxParticipants: 15,
//     discountStructure: 'fixed',
//     deadline: 24,
//     estimatedRewards: 0,
//   })
//   const [shareableLink, setShareableLink] = useState('')

//   const handleNext = () => setStep(step + 1)
//   const handlePrev = () => setStep(step - 1)

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setGroupPurchase({ ...groupPurchase, [e.target.name]: e.target.value })
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const imageUrl = handleFileUpload(e.target.files[0])
//       setGroupPurchase({ ...groupPurchase, productImage: imageUrl })
//     }
//   }

//   const handleGenerateLink = () => {
//     const link = generateShareableLink(groupPurchase)
//     setShareableLink(link)
//   }

//   const handlePublish = () => {
//     console.log('Group purchase published:', groupPurchase)
//     // In a real application, you would submit the data to your backend here
//   }

//   return (
//     <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-orange-100 to-yellow-200 border-4 border-orange-500">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-orange-700">
//           Create Group Purchase - Such Wow!
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
        // <div className="mb-4">
        //   <div className="flex justify-between mb-2">
        //     {[1, 2, 3, 4].map((i) => (
        //       <div key={i} className="relative">
        //         <Bone 
        //           className={`w-12 h-12 ${i <= step ? 'text-orange-500' : 'text-gray-500'}`} 
        //         />
        //         <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
        //           {i}
        //         </span>
        //       </div>
        //     ))}
        //   </div>
        //   <div className="text-center text-sm font-medium">
        //     Step {step} of 4 - Much Progress!
        //   </div>
        // </div>

//         {step === 1 && (
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">1. Product Selection</h3>
//             <div className="space-y-2">
//               <Label htmlFor="productName">Product Name</Label>
//               <Input
//                 id="productName"
//                 name="productName"
//                 value={groupPurchase.productName}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="productImage">Product Image</Label>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   id="productImage"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//                 <Button asChild>
//                   <label htmlFor="productImage" className="cursor-pointer">
//                     <Upload className="w-4 h-4 mr-2" />
//                     Upload Image
//                   </label>
//                 </Button>
//                 {groupPurchase.productImage && (
//                   <Image
//                     src={groupPurchase.productImage}
//                     alt="Product"
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 )}
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="productPrice">Product Price</Label>
//               <Input
//                 id="productPrice"
//                 name="productPrice"
//                 type="number"
//                 value={groupPurchase.productPrice}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="productDescription">Product Description</Label>
//               <Textarea
//                 id="productDescription"
//                 name="productDescription"
//                 value={groupPurchase.productDescription}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">2. Set Group Goals</h3>
//             <div className="space-y-2">
//               <Label htmlFor="minParticipants">Minimum Participants</Label>
//               <Input
//                 id="minParticipants"
//                 name="minParticipants"
//                 type="number"
//                 value={groupPurchase.minParticipants}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="maxParticipants">Maximum Participants</Label>
//               <Input
//                 id="maxParticipants"
//                 name="maxParticipants"
//                 type="number"
//                 value={groupPurchase.maxParticipants}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Discount Structure</Label>
//               <RadioGroup
//                 defaultValue={groupPurchase.discountStructure}
//                 onValueChange={(value) =>
//                   setGroupPurchase({ ...groupPurchase, discountStructure: value })
//                 }
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="fixed" id="fixed" />
//                   <Label htmlFor="fixed">Fixed Discount</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="dynamic" id="dynamic" />
//                   <Label htmlFor="dynamic">Dynamic Pricing</Label>
//                 </div>
//               </RadioGroup>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="deadline">Deadline (hours)</Label>
//               <Slider
//                 id="deadline"
//                 min={1}
//                 max={72}
//                 step={1}
//                 value={[groupPurchase.deadline]}
//                 onValueChange={(value) =>
//                   setGroupPurchase({ ...groupPurchase, deadline: value[0] })
//                 }
//               />
//               <div className="text-sm text-gray-500">{groupPurchase.deadline} hours</div>
//             </div>
//           </div>
//         )}

//         {step === 3 && (
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">3. Publish Group Order</h3>
//             <div className="p-4 bg-gray-100 rounded-md">
//               <h4 className="font-semibold mb-2">Order Summary</h4>
//               <div className="space-y-2">
//                 <p><strong>Product:</strong> {groupPurchase.productName}</p>
//                 <p><strong>Price:</strong> ${groupPurchase.productPrice}</p>
//                 <p><strong>Min. Participants:</strong> {groupPurchase.minParticipants}</p>
//                 <p><strong>Max. Participants:</strong> {groupPurchase.maxParticipants}</p>
//                 <p><strong>Discount Structure:</strong> {groupPurchase.discountStructure}</p>
//                 <p><strong>Deadline:</strong> {groupPurchase.deadline} days</p>
//                 <p><strong>Estimated Rewards:</strong> ${groupPurchase.estimatedRewards}</p>
//               </div>
//             </div>
//             <Button onClick={handlePublish} className="w-full">Publish Group Order</Button>
//           </div>
//         )}    

//         {step === 4 && (
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">4. Generate and Share Links</h3>
//             <Button onClick={handleGenerateLink} className="w-full">
//               <Zap className="w-4 h-4 mr-2" />
//               Generate Shareable Link
//             </Button>
//             {shareableLink && (
//               <div className="mt-4 p-4 bg-gray-100 rounded-md">
//                 <h4 className="font-semibold mb-2">Preview</h4>
//                 <div className="space-y-2">
//                   <p><strong>Product:</strong> {groupPurchase.productName}</p>
//                   <p><strong>Price:</strong> ${groupPurchase.productPrice}</p>
//                   <p><strong>Min. Participants:</strong> {groupPurchase.minParticipants}</p>
//                   <p><strong>Max. Participants:</strong> {groupPurchase.maxParticipants}</p>
//                   <p><strong>Deadline:</strong> {groupPurchase.deadline} hours</p>
//                   <p><strong>Link:</strong> <a href={shareableLink} className="text-blue-500 underline">{shareableLink}</a></p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         {step > 1 && (
//           <Button onClick={handlePrev} variant="outline">
//             <ChevronLeft className="w-4 h-4 mr-2" />
//             Previous
//           </Button>
//         )}
//         {step < 4 && (
//           <Button onClick={handleNext} className="ml-auto bg-orange-500 hover:bg-orange-600 text-white">
//             Next
//             <ChevronRight className="w-4 h-4 ml-2" />
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   )
// }

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, ChevronLeft, Bone } from 'lucide-react'
import Image from 'next/image'

const predefinedProducts = [
  { id: 1, name: "Wireless Earbuds", minprice: 50, maxprice: 70, image: "/airpods.webp" },
  { id: 2, name: "Smartwatch", minprice: 120, maxprice: 150, image: "/smartwatch.webp" },
  { id: 3, name: "Smart Tv", minprice: 80, maxprice: 120, image: "/smartTV.webp" },
  { id: 4, name: "Headphone", minprice: 50, maxprice: 70, image: "/headphone.webp" },
]
const predefinedPlans = [
  { id: 1, min: 5, max: 10, price: 45 },
  { id: 2, min: 10, max: 20, price: 40 },
  { id: 3, min: 20, max: 50, price: 35 },
]

export function CreateGroupPurchase() {
  const [step, setStep] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(predefinedProducts[0])
  const [selectedPlan, setSelectedPlan] = useState(predefinedPlans[0])
  const [groupPurchase, setGroupPurchase] = useState({
    startTime: "",
    duration: 24, // default duration in hours
  })
  const [shareableLink, setShareableLink] = useState("")

  const handleNext = () => setStep(step + 1)
  const handlePrev = () => setStep(step - 1)

  const handleGenerateLink = () => {
    const link = `https://example.com/group-purchase/${Math.random().toString(36).substring(7)}`
    setShareableLink(link)
  }

  const handlePublish = () => {
    console.log("Group purchase published:", { selectedProduct, ...groupPurchase })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-orange-100 to-yellow-200 border-4 border-orange-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-orange-700">
          Create Group Purchase - Such Wow!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative">
                  <Bone 
                    className={`w-12 h-12 ${i <= step ? 'text-orange-500' : 'text-gray-500'}`} 
                  />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                    {i}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center text-sm font-medium">
              Step {step} of 4 - Much Progress!
            </div>
          </div>
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">1. Select Product</h3>
            <Select
              value={selectedProduct.id.toString()}
              onValueChange={(value) =>
                setSelectedProduct(predefinedProducts.find((p) => p.id === parseInt(value)) || predefinedProducts[0])
              }
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
            <div className="mt-4">
              <Label>Selected Product</Label>
              <div className="flex items-center space-x-4 mt-2">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={64}
                  height={64}
                  className="rounded"
                />
                <div>
                  <p className="font-semibold">{selectedProduct.name}</p>
                  <p>${selectedProduct.minprice} ~ {selectedProduct.maxprice}</p>
                </div>
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
                setSelectedPlan(predefinedPlans.find((p) => p.id === parseInt(value)) || predefinedPlans[0])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a plan" />
              </SelectTrigger>
              <SelectContent>
                {predefinedPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id.toString()}>
                    {plan.min}-{plan.max} participants: ${plan.price} per unit
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-4">
              <Label>Selected Plan</Label>
              <div className="p-4 bg-gray-100 rounded-md">
                <p><strong>Participants:</strong> {selectedPlan.min}-{selectedPlan.max}</p>
                <p><strong>Price per Unit:</strong> ${selectedPlan.price}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
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
                onValueChange={(value) =>
                  setGroupPurchase({ ...groupPurchase, duration: value[0] })
                }
              />
              <div className="text-sm text-gray-500">{groupPurchase.duration} hours</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">3. Publish Group Order</h3>
            <div className="p-4 bg-gray-100 rounded-md">
              <h4 className="font-semibold mb-2">Order Summary</h4>
              <div className="space-y-2">
                <p><strong>Product:</strong> {selectedProduct.name}</p>
                <p><strong>Price:</strong> ${selectedPlan.price}</p>
                <p><strong>Min participants:</strong> ${selectedPlan.min}</p>
                <p><strong>Max participants:</strong> ${selectedPlan.max}</p>
                <p><strong>Start Time:</strong> {groupPurchase.startTime || "Not set"}</p>
                <p><strong>Duration:</strong> {groupPurchase.duration} hours</p>
              </div>
            </div>
            <Button onClick={handlePublish} className="w-full">Publish Group Order</Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">4. Generate and Share Links</h3>
            <Button onClick={handleGenerateLink} className="w-full">
              Generate Shareable Link
            </Button>
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
  )
}

