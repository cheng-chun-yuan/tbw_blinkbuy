import {
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
} from "@solana/actions";
import {
  SystemProgram,
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";

import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";

import BlinkbuyJson from "@/app/idl/blinkbuy.json";
import { type Blinkbuy} from "@/app/idl/blinkbuy";
import { connect } from "net";

const params = {
  title: 'AirPods - Elevate Your Audio Experience',
  icon:'/airpods.webp',
  description: "Click to mint your NFT and own premium AirPods now!",
  label: "AirPods - Mint Now!"
}

function getDescription({
  currentAmount,
  startTime,
  expiredTime,
  minAmount,
  maxAmount,
  price,
  manager,
}: {
  currentAmount: anchor.BN;
  startTime: anchor.BN;
  expiredTime: anchor.BN;
  minAmount: anchor.BN;
  maxAmount: anchor.BN;
  price: anchor.BN;
  manager: PublicKey;
}): string {
  // Convert BN and PublicKey values to string for readability
  const current = currentAmount.toString();
  const start = new Date(startTime.toNumber() * 1000).toLocaleString(); // Convert UNIX to Date
  const expiry = new Date(expiredTime.toNumber() * 1000).toLocaleString();
  const min = minAmount.toString();
  const max = maxAmount.toString();
  const priceValue = (Number(price)/1e6).toString();
  const managerAddress = manager.toString();

  // Construct the description
  return `
    Group Order Details:
    - Manager: Albert
    - Current Progress: ${current} items purchased
    - Start Time: ${start}
    - Expiry Time: ${expiry}
    - Minimum Order Requirement: ${min} items
    - Maximum Order Capacity: ${max} items
    - Price per Item: ${priceValue} BONK
  `;
}


export const GET = async (req: Request) => {
  const connection = new Connection(clusterApiUrl('devnet'), {
    commitment: "confirmed",
  });
  const program = new Program<Blinkbuy>(BlinkbuyJson as Blinkbuy, {connection});

  const { searchParams } = new URL(req.url);
  const group_order_param = searchParams.get('grouporder') || "default";
  const group_order = new PublicKey(group_order_param);

  const group_order_data = await program.account.groupOrder.fetch(group_order)
  const {
    manager,
    numRequirement,
    groupManagerCertificate,
    currentAmount,
    startTime,
    expiredTime,
    minAmount,
    maxAmount,
    price
  } = group_order_data;
  const description = getDescription({
    currentAmount,
    startTime,
    expiredTime,
    minAmount,
    maxAmount,
    price,
    manager,
  });
  
  const payload: ActionGetResponse = {
    title: params.title,
    icon: new URL(
      params.icon,
      new URL(req.url).origin
    ).toString(),
    description: description,
    label: params.label,
    links:
    {
      "actions": [
        {
          label: "Buy Now",
          href: `/api/buy/${group_order}?amount={amount}`,
          parameters: [
            // {name} input field
            {
              name: "amount",
              label: "Amount",
              type: "number",
            },
          ],
          type: "transaction",
        }
      ]
    }
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const body: ActionPostRequest = await req.json();
    // Validate to confirm the user publickey received is valid before use
    let provider: PublicKey;
    try {
      provider = new PublicKey(body.account);
    } catch (err) {
      return new Response('Invalid "account" provided', {
        status: 400,
        headers: ACTIONS_CORS_HEADERS, //Must include CORS HEADERS
      });
    }

    // const connection = new Connection(providerUrl);
    const connection = new Connection(clusterApiUrl('devnet'), {
      commitment: "confirmed",
    });
    const program = new Program<Blinkbuy>(BlinkbuyJson as Blinkbuy, {connection});

    // Determined Escrow and Vault addresses
    const { searchParams } = new URL(req.url);
    const amount = searchParams.get("amount");
    const group_order_param = searchParams.get('grouporder') || "default";
    const group_order = new PublicKey(group_order_param);
  
    const group_order_data = await program.account.groupOrder.fetch(group_order)
    const manager = group_order_data.manager

    const group_request = PublicKey.findProgramAddressSync(
      [Buffer.from("group_request"), group_order.toBuffer(), provider.toBuffer()],
      program.programId
    )[0];

    const accounts = {
      buyer: provider,
      manager,
      groupOrder: group_order,
      groupRequest: group_request,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenProgram: TOKEN_2022_PROGRAM_ID,
      systemProgram: SystemProgram.programId
    }

    if (!amount) {
      console.log("amount",amount)
      return new Response("Invalid parameters", {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    const bn_amount = new BN(Number(amount))
    const claimInstruction = await program.methods
      .buyProduct(bn_amount)
      .accounts({
        ...accounts
      })
      .instruction();

    // Create a transaction and add the transfer instruction
    const transaction = new Transaction().add(claimInstruction);
    // Set the recent blockhash and fee payer
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.feePayer = provider;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        type: "transaction"
      },
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.log(err);
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;
    return new Response(message, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS, //Must include CORS HEADERS
    });
  }
};

export const runtime = 'edge' // 'nodejs' (default) | 'edge'