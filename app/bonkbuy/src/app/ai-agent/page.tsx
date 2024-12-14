/* eslint-disable @next/next/no-img-element */
// Define this when using the App router API
"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./style.module.css";
export type GenericObject<T = string> = { [key: string]: T };

export interface RequestDetails {
  // eslint-disable-next-line
  body: any;
  headers?: GenericObject<string>;
}
// Info to get a reference for the component:
// https://github.com/OvidijusParsiunas/deep-chat/issues/59#issuecomment-1839483469

// Info to add types to a component reference:
// https://github.com/OvidijusParsiunas/deep-chat/issues/59#issuecomment-1839487740

export default function Home() {
  const DeepChat = dynamic(
    () => import("deep-chat-react").then((mod) => mod.DeepChat),
    {
      ssr: false,
    }
  );

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
        <div className={styles.components}>
          <DeepChat
            style={{ borderRadius: "10px", border: "2px solid #ff69b4" }}
            introMessage={{ 
                text: "🐕 Bonk! Hello there! ✨\n\n" +
                      "🛍️ What would you like to buy?\n" +
                      "👥 How many friends joining?\n\n" +
                      "🚀 Let's find you the best deal! 💫"
              }}
            connect={{
              url: "/api/openai/chat-stream",
              stream: true,
              additionalBodyProps: { model: "gpt-4o" },
            }}
            requestBodyLimits={{ maxMessages: -1 }}
            errorMessages={{ displayServiceErrorMessages: true }}
          />
        </div>
      </div>
      <div className="text-center mt-8">
        <Link href="/" passHref>
          <span className="inline-block bg-orange-700 text-white py-2 px-4 rounded-md hover:bg-orange-800">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
}
