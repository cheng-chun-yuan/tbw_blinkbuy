import {DeepChatOpenAITextRequestBody, OpenAIConverseResult} from '../../../../utils/openAIChatBody';
import errorHandler from '../../../../utils/errorHandler';
import {NextRequest, NextResponse} from 'next/server';

export const runtime = 'edge';

// Make sure to set the OPENAI_API_KEY environment variable

async function handler(req: NextRequest) {
  // Text messages are stored inside request body using the Deep Chat JSON format:
  // https://deepchat.dev/docs/connect
  const textRequestBody = (await req.json()) as DeepChatOpenAITextRequestBody;
  // Correcting the format to match the desired structure
  
  const systemMessage = {
    messages: [
      {
        role: "system",
        text: `[
  {
    "id": 0,
    "name": "Bonk-Cancelling Headphones",
    "description": "Cut out the chaos, tune into focus! 🎧 Block out background noise effortlessly with cutting-edge bonk-level noise cancellation technology, perfect for music lovers and productivity enthusiasts.",
    "details": "These state-of-the-art headphones offer unparalleled noise cancellation to enhance your focus, making them ideal for work, travel, or immersive music experiences.",
    "plans": [
      { "id": 0, "min": 5, "max": 10, "price": 70000 },
      { "id": 1, "min": 10, "max": 20, "price": 60000 },
      { "id": 2, "min": 20, "max": 50, "price": 50000 }
    ]
  },
  {
    "id": 1,
    "name": "Doge-Approved 4K Smart TV",
    "description": "Experience 4K visuals so sharp, they bring the stars closer! 📺🌌 Perfect for movie nights, gaming, or streaming your favorite content in stunning clarity.",
    "details": "This 4K Smart TV combines HDR support with vibrant colors, delivering an immersive viewing experience. Perfect for enhancing your home entertainment setup.",
    "plans": [
      { "id": 0, "min": 5, "max": 10, "price": 150000 },
      { "id": 1, "min": 10, "max": 20, "price": 140000 },
      { "id": 2, "min": 50, "max": 60, "price": 120000 }
    ]
  },
  {
    "id": 2,
    "name": "Bonk Vacuum of the Future",
    "description": "Revolutionize cleaning with AI-powered precision! 🤖 Perfect for pet owners and busy households seeking effortless multi-surface cleaning.",
    "details": "This advanced vacuum uses AI technology to clean intelligently, adapting to different surfaces for a spotless home every time.",
    "plans": [
      { "id": 0, "min": 20, "max": 30, "price": 8000000 },
      { "id": 1, "min": 5, "max": 10, "price": 9500000 },
      { "id": 2, "min": 2, "max": 5, "price": 12000000 }
    ]
  },
  {
    "id": 3,
    "name": "Bonk Wireless Airpods",
    "description": "Wireless audio perfection! 🎧 Seamlessly connect and enjoy crystal-clear sound wherever you go.",
    "details": "Experience high-quality sound with wireless convenience. These Airpods redefine your listening experience with cutting-edge audio technology.",
    "plans": [
      { "id": 0, "min": 5, "max": 10, "price": 50000 },
      { "id": 1, "min": 10, "max": 20, "price": 60000 },
      { "id": 2, "min": 20, "max": 50, "price": 70000 }
    ]
  },
  {
    "id": 4,
    "name": "Bonk Smart Watch",
    "description": "Stay ahead of time with futuristic features! ⌚ Track your health and lifestyle in style.",
    "details": "This sleek smartwatch is designed for the modern lifestyle, offering advanced tracking features and a stylish design for everyday use.",
    "plans": [
      { "id": 0, "min": 100, "max": 150, "price": 30000 },
      { "id": 1, "min": 20, "max": 50, "price": 50000 },
      { "id": 2, "min": 10, "max": 20, "price": 60000 }
    ]
  }
] You are a recommendation assistant helping users choose the most suitable product plans based on their fan base size and focus areas. Evaluate the product plans using these criteria:

Fan Base Fit:
Match plans with the user's audience size and potential engagement.
Budget and Value:
Prioritize plans that align with the user’s price feasibility.
Provide the top three recommended product plans as a list of product_id and plan_id, ranked from Tier 1 to Tier 3, without any explanation. Please just return with the metric  [tier, product_id, plan_id] such as [1,1,2], [2,4,1], [3,1,1] `
      }
    ]
  };

    // Merging the system message with user messages
  const newtextRequestBody = {
    ...textRequestBody,
    messages: [...systemMessage.messages, ...textRequestBody.messages],
  };

  const result = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(newtextRequestBody),
  });

  const openAIResult = (await result.json()) as OpenAIConverseResult;
  if (openAIResult.error) throw openAIResult.error.message;
  // Sends response back to Deep Chat using the Response format:
  // https://deepchat.dev/docs/connect/#Response
  return NextResponse.json({text: openAIResult.choices[0].message?.content || ''});
}

export const POST = errorHandler(handler);
