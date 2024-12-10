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

const params = {
  title: '',
  icon:'/nft.png',
  description: "Simple click to mint your NFT.",
  label: "Mint XueDAO NFT"
}

export const GET = (req: Request, { param }: { param: { grouporder: string } },) => {
  const  group_order = 'param';
  const payload: ActionGetResponse = {
    title: params.title,
    icon: new URL(
      params.icon,
      new URL(req.url).origin
    ).toString(),
    description: params.description,
    label: params.label,
    links:
    {
      "actions": [
        {
          label: "mint",
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
    const manager = new PublicKey("88wovrYcAuc7kokA5J361b9zLZhWYU9j6FSZho5RFqC6")
  
    const orderIndex = new BN(0)
    const group_order = PublicKey.findProgramAddressSync(
      [Buffer.from("group_order"), manager.toBuffer(), orderIndex.toArrayLike(Buffer, "le", 8)],
      program.programId
    )[0];
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

    // Determined Escrow and Vault addresses
    const params = new URL(req.url).searchParams;
    const amount = params.get("amount");

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