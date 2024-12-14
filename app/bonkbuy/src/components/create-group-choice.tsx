"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput, BotIcon } from "lucide-react";

export function CreateGroupPurchaseChoice() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChoice = (choice: "form" | "ai") => {
    setIsLoading(true);
    if (choice === "form") {
      router.push("/form");
    } else {
      router.push("/ai-agent");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full px-4">
        <Card className="w-full bg-gradient-to-br from-orange-100 to-yellow-200 border-4 border-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <FormInput className="w-8 h-8 mr-2 text-orange-700" />
              Create by Form
            </CardTitle>
            <CardDescription>
              Fill out a structured form to create your group purchase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              Perfect for those who know exactly what they want!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => handleChoice("form")}
              disabled={isLoading}
            >
              Choose Form
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full bg-gradient-to-br from-orange-100 to-yellow-200 border-4 border-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <BotIcon className="w-8 h-8 mr-2 text-orange-700" />
              Create with AI
            </CardTitle>
            <CardDescription>
              Chat with an AI agent to create your group purchase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              Great for exploring options and getting suggestions!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => handleChoice("ai")}
              disabled={isLoading}
            >
              Choose AI Agent
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
