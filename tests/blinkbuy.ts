import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { Blinkbuy } from "../target/types/blinkbuy";

import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  ExtensionType,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  MINT_SIZE,
  MetadataPointerInstruction,
  TOKEN_2022_PROGRAM_ID,
  getMintLen,
  createAssociatedTokenAccountIdempotentInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  TYPE_SIZE,
  LENGTH_SIZE,
} from "@solana/spl-token";

describe("blinkbuy", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Blinkbuy as Program<Blinkbuy>;

  const provider = anchor.getProvider();

  const connection = provider.connection;

  const tokenProgram = TOKEN_2022_PROGRAM_ID;

  const mintBonk = new PublicKey("Aqk2sTGwLuojdYSHDLCXgidGNUQeskWS2JbKXPksHdaG")

  const [buyer1, buyer2, manager] = Array.from({ length: 3 }, () =>
    Keypair.generate()
  );

  const confirm = async (signature: string): Promise<string> => {
    const block = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      signature,
      ...block,
    });
    return signature;
  };

  const log = async (signature: string): Promise<string> => {
    console.log(
      `Your transaction signature: https://explorer.solana.com/transaction/${signature}?cluster=devnet`
    );
    return signature;
  };

  const store = PublicKey.findProgramAddressSync(
    [Buffer.from("store"), provider.publicKey.toBuffer()],
    program.programId
  )[0];
  const productIndex = new BN(0)
  const product = PublicKey.findProgramAddressSync(
    [Buffer.from("store_product"), store.toBuffer(), productIndex.toArrayLike(Buffer, "le", 8)],
    program.programId
  )[0];
  const group_manager_certificate = PublicKey.findProgramAddressSync(
    [Buffer.from("store"), store.toBuffer(), manager.publicKey.toBuffer()],
    program.programId
  )[0];

  const orderIndex = new BN(0)
  const group_order = PublicKey.findProgramAddressSync(
    [Buffer.from("group_order"), manager.publicKey.toBuffer(), orderIndex.toArrayLike(Buffer, "le", 8)],
    program.programId
  )[0];
  const group_request = PublicKey.findProgramAddressSync(
    [Buffer.from("group_request"), group_order.toBuffer(), buyer2.publicKey.toBuffer()],
    program.programId
  )[0];
  
  // const product = new PublicKey("2soMCw81zUZDEhLhtdqGngxPjXzAtYZmGR9deCgKpCjp")

  // const num_price_requirement = new BN(0);
  // const price_requirement = PublicKey.findProgramAddressSync(
  //   [Buffer.from("product"), product.toBuffer(), num_price_requirement.toBuffer("le", 8)],
  //   program.programId
  // )[0];
  // const product = new PublicKey("C71kMwhtEBtvwcR96PvbU8CvJbw1k9WAkpoZ1sVm1H55")
  const buyer1AtaBonk = getAssociatedTokenAddressSync(mintBonk, buyer1.publicKey, false, tokenProgram)
  const buyer2AtaBonk = getAssociatedTokenAddressSync(mintBonk, buyer2.publicKey, false, tokenProgram)
  const num_price_requirement1 = new BN(0);
  const price_requirement1 = PublicKey.findProgramAddressSync(
    [Buffer.from("price_requirement"), product.toBuffer(), num_price_requirement1.toArrayLike(Buffer, "le", 8)],
    program.programId
  )[0];
  const mint_nft = PublicKey.findProgramAddressSync(
    [Buffer.from("mint"), product.toBuffer()],
    program.programId
  )[0];
  const num_price_requirement2 = new BN(1);
  const price_requirement2 = PublicKey.findProgramAddressSync(
    [Buffer.from("price_requirement"), product.toBuffer(), num_price_requirement2.toArrayLike(Buffer, "le", 8)],
    program.programId
  )[0];
  const accounts = {
    mintNft: mint_nft,
    buyer: buyer2.publicKey,
    storeOwner: provider.publicKey,
    store,
    product,
    manager: manager.publicKey,
    currency: mintBonk,
    tokenProgram,
    groupManagerCertificate: group_manager_certificate,
    groupOrder: group_order,
    groupRequest: group_request,
    priceRequirement: price_requirement1,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    systemProgram: SystemProgram.programId
  }

  it("Airdrop", async () => {
    // Airdrop lamports to accounts
    const airdropTx = new Transaction();
    airdropTx.add(
      ...[manager, buyer1, buyer2].map((account) =>
        SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: account.publicKey,
          lamports: 0.04 * LAMPORTS_PER_SOL,
        })
      )
    );
    await provider.sendAndConfirm(airdropTx, []).then(log);
  });

  it("Airdrop All Token", async () => {
    let tx = new Transaction();
    tx.instructions = [
      ...[
        { ata: buyer1AtaBonk, receiver: buyer1.publicKey },
        { ata: buyer2AtaBonk, receiver: buyer2.publicKey },
        // { mint: mintBonk, ata: ownerAtaBonk, receiver: provider.publicKey },
      ].flatMap((x) => [
        createAssociatedTokenAccountIdempotentInstruction(x.receiver, x.ata, x.receiver, mintBonk, tokenProgram),
        createMintToInstruction(mintBonk, x.ata, provider.publicKey, 1e11, undefined, tokenProgram),
      ]),
    ];
    await provider.sendAndConfirm(tx, [buyer1, buyer2]).then(log);
  });

  it("Create Store!", async () => {
    // Add your test here.
    await program.methods
      .createStore()
      .accounts({
        ...accounts
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("add_product!", async () => {
    // Add your test here.
    const total_issued_amount = new BN(1000)
    const name = "AirPods"
    const symbol = "AP"
    const uri = "https://gateway.pinata.cloud/ipfs/Qmd3FfsyaGfR2yrnNNCxreMKkvn9ByjsL3Te2CG2ozVM89"
    await program.methods
      .addProduct(total_issued_amount, name, symbol, uri)
      .accounts({
        ...accounts,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("update_product!", async () => {
    // Add your test here.
    const total_issued_amount = new BN(100)
    await program.methods
      .updateTotalIssuedAmount(total_issued_amount)
      .accounts({
        ...accounts
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("add_price_requirement1!", async () => {
    // Add your test here.
    const min_amount = new BN(10)
    const max_amount = new BN(20)
    const price = new BN(1e9)
    const init_fee = new BN(1e6)
    await program.methods
      .addPriceRequirement(min_amount, max_amount, price, init_fee)
      .accounts({
        ...accounts,
      })
      .rpc()
      .then(confirm)
      .then(log);
  });
  xit("add_price_requirement2!", async () => {
    // Add your test here.
    const min_amount = new BN(15)
    const max_amount = new BN(30)
    const price = new BN(1e8)
    const init_fee = new BN(1e8)
    await program.methods
      .addPriceRequirement(min_amount, max_amount, price, init_fee)
      .accounts({
        ...accounts
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("request_group_manager!", async () => {
    // Add your test here.
    const promo_code = Buffer.from("NINJA666")
    await program.methods
      .requestGroupManager(promo_code)
      .accounts({
        ...accounts
      })
      .signers([manager])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("approve_group_manager!", async () => {
    // Add your test here.
    await program.methods
      .approveGroupManager()
      .accounts({
        ...accounts
      })
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("create_group_order!", async () => {
    // Add your test here.
    const manager_refund = new BN(5)
    const start_time = new BN(1e8)
    const expired_time = new BN(1e8)
    const num_requirement = new BN(1)
    await program.methods
      .createGroupOrder(manager_refund, start_time, num_requirement, expired_time)
      .accounts({
        ...accounts
      })
      .signers([manager])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("buy_product!", async () => {
    // Add your test here.
    const amount = new BN(5)
    await program.methods
      .buyProduct(amount)
      .accounts({
        ...accounts
      })
      .signers([buyer2])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("cancel_product!", async () => {
    await program.methods
      .cancelRequest()
      .accounts({
        ...accounts
      })
      .signers([buyer2])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("buy_product!", async () => {
    const amount = new BN(15)
    await program.methods
      .buyProduct(amount)
      .accounts({
        ...accounts
      })
      .signers([buyer2])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("claim_product!", async () => {
    // Add your test here.
    await program.methods
      .claimProduct()
      .accounts({
        ...accounts
      })
      .signers([buyer2])
      .rpc()
      .then(confirm)
      .then(log);
  });
});
