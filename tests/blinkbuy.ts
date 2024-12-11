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

  const [buyer1, buyer2] = Array.from({ length: 2 }, () =>
    Keypair.generate()
  );

  const manager = provider.publicKey;

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

  const productIndex = new BN(0)
  const orderIndex = new BN(3)
  const num_price_requirement = new BN(0);

  const store = PublicKey.findProgramAddressSync(
    [Buffer.from("store"), provider.publicKey.toBuffer()],
    program.programId
  )[0];

  const product = PublicKey.findProgramAddressSync(
    [Buffer.from("store_product"), store.toBuffer(), productIndex.toArrayLike(Buffer, "le", 8)],
    program.programId
  )[0];
  console.log(product.toBase58())
  const group_manager_certificate = PublicKey.findProgramAddressSync(
    [Buffer.from("store"), store.toBuffer(), manager.toBuffer()],
    program.programId
  )[0];
  console.log(group_manager_certificate.toBase58())

  const group_order = PublicKey.findProgramAddressSync(
    [Buffer.from("group_order"), manager.toBuffer(), orderIndex.toArrayLike(Buffer, "le", 8)],
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
  const price_requirement = PublicKey.findProgramAddressSync(
    [Buffer.from("price_requirement"), product.toBuffer(), num_price_requirement.toArrayLike(Buffer, "le", 8)],
    program.programId
  )[0];
  const mint_nft = PublicKey.findProgramAddressSync(
    [Buffer.from("mint"), product.toBuffer()],
    program.programId
  )[0];
  const accounts = {
    mintNft: mint_nft,
    buyer: buyer2.publicKey,
    storeOwner: provider.publicKey,
    store,
    product,
    manager: manager,
    currency: mintBonk,
    groupManagerCertificate: group_manager_certificate,
    groupOrder: group_order,
    groupRequest: group_request,
    priceRequirement: price_requirement,
    tokenProgram,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    systemProgram: SystemProgram.programId
  }
  const products = [
    {
      id: 0,
      name: "Bonk-Cancelling Headphones",
      total_issued_amount: new BN(1000),
      symbol: "headphone",
      uri: "https://gateway.pinata.cloud/ipfs/bafkreifgtvuxh7iz25rcquqay4bwnrututpvj5tvhpx7uhg6bdsdun4ldi",
      plans: [
        { id:0, min: 5, max: 10, price: 70 },
        { id:1, min: 10, max: 20, price: 60 },
        { id:2, min: 20, max: 50, price: 50 },
      ],
    },
    {
      id: 1,
      total_issued_amount: new BN(2000),
      name: "Doge-Approved 4K Smart TV",
      symbol: "STV",
      uri: "https://gateway.pinata.cloud/ipfs/bafkreibjfaor5gb7t2ufn2bduymfjnxgrpo2pktmcadgygo7k5qpjers6e",
      plans: [
        { id:0, min: 5, max: 10, price: 150 },
        { id:1, min: 10, max: 20, price: 140 },
        { id:2, min: 50, max: 60, price: 120 },
      ],
    },
    {
      id: 2,
      total_issued_amount: new BN(1500),
      name: "Bonk Vacuum of the Future",
      symbol: "vacuum",
      uri: "https://gateway.pinata.cloud/ipfs/bafkreiehqxvojk7pbdochv6pcksmp5s5l64yoe2iv2dsys7zsdezw3jigi",
      plans: [
        { id:0, min: 20, max: 30, price: 8000 },
        { id:1, min: 5, max: 10, price: 9500 },
        { id:2, min: 2, max: 5, price: 12000 },
      ],
    },
    {
      id: 3,
      total_issued_amount: new BN(1200),
      name: "Bonk Wireless Airpods",
      symbol: "airpods",
      uri: "https://gateway.pinata.cloud/ipfs/bafkreihvu2m222jd7rq6h5wpo2sh34d45tv2ed3tmse7wtey6ujhcu7spm",
      plans: [
        { id:0, min: 5, max: 10, price: 50 },
        { id:1, min: 10, max: 20, price: 60 },
        { id:2, min: 20, max: 50, price: 70 },
      ],
    },
    {
      id: 4,
      total_issued_amount: new BN(1700),
      name: "Bonk smart watch",
      symbol: "smartwatch",
      uri: "https://gateway.pinata.cloud/ipfs/bafkreib7qqm32z6jpn37nkcory7lwkufjwaqnd4io2ma4m5pnvkxwowsrq",
      plans: [
        { id:0, min: 100, max: 150, price: 30 },
        { id:1, min: 20, max: 50, price: 50 },
        { id:2, min: 10, max: 20, price: 60 },
      ],
    },
  ];
  

  xit("Airdrop", async () => {
    // Airdrop lamports to accounts
    const airdropTx = new Transaction();
    airdropTx.add(
      ...[buyer1, buyer2].map((account) =>
        SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: account.publicKey,
          lamports: 0.04 * LAMPORTS_PER_SOL,
        })
      )
    );
    await provider.sendAndConfirm(airdropTx, []).then(log);
  });

  xit("Airdrop All Token", async () => {
    let tx = new Transaction();
    tx.instructions = [
      ...[
        { ata: buyer1AtaBonk, receiver: buyer1.publicKey },
        { ata: buyer2AtaBonk, receiver: buyer2.publicKey },
        // { mint: mintBonk, ata: ownerAtaBonk, receiver: provider.publicKey },
      ].flatMap((x) => [
        createAssociatedTokenAccountIdempotentInstruction(x.receiver, x.ata, x.receiver, mintBonk, tokenProgram),
        createMintToInstruction(mintBonk, x.ata, provider.publicKey, 1e13, undefined, tokenProgram),
      ]),
    ];
    await provider.sendAndConfirm(tx, [buyer1, buyer2]).then(log);
  });

  xit("Create Store!", async () => {
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

  xit("add_five_product!", async () => {
    for (const product of products) {
      const productIndex = new BN(product.id);
      const productPublicKey = PublicKey.findProgramAddressSync(
        [Buffer.from("store_product"), store.toBuffer(), productIndex.toArrayLike(Buffer, "le", 8)],
        program.programId
      )[0];
      const mint_nft = PublicKey.findProgramAddressSync(
        [Buffer.from("mint"), productPublicKey.toBuffer()],
        program.programId
      )[0];
      await program.methods
      .addProduct(product.total_issued_amount, product.name, product.symbol, product.uri)
      .accountsStrict({
        storeOwner: provider.publicKey,
        mintNft: mint_nft,
        store,
        product: productPublicKey,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram,
        systemProgram: SystemProgram.programId,
      })
        .rpc()
        .then(confirm)
        .then(log);
    }
  });

  xit("update_product!", async () => {
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

  xit("add_each_product_three_price_requirement1!", async () => {
    // Fixed initialization fee
    const init_fee = new BN(1e6);

    for (const product of products) {
      const productIndex = new BN(product.id);
      const productPublicKey = PublicKey.findProgramAddressSync(
        [Buffer.from("store_product"), store.toBuffer(), productIndex.toArrayLike(Buffer, "le", 8)],
        program.programId
      )[0];

      console.log(`Adding price requirements for product: ${product.name} (Index: ${product.id})`);
      console.log("id",product.id,"productPublicKey",productPublicKey.toBase58())
      for (const plan of product.plans) {
        const min_amount = new BN(plan.min);
        const max_amount = new BN(plan.max);
        const price = new BN(plan.price * 1e9); // Assuming price in lamports
        const num_price_requirement = new BN(plan.id);
        const price_requirement = PublicKey.findProgramAddressSync(
          [Buffer.from("price_requirement"), productPublicKey.toBuffer(), num_price_requirement.toArrayLike(Buffer, "le", 8)],
          program.programId
        )[0];
        console.log("id",plan.id,"price_requirement",price_requirement.toBase58())
        await program.methods
          .addPriceRequirement(min_amount, max_amount, price, init_fee)
          .accountsStrict({
            storeOwner: provider.publicKey,
            currency: mintBonk,
            priceRequirement: price_requirement,
            store,
            product: productPublicKey,
            tokenProgram,
            systemProgram: SystemProgram.programId,
          })
          .rpc()
          .then(confirm)
          .then(log);
      }
    }
  });

  xit("request_group_manager!", async () => {
    // Add your test here.
    const promo_code = Buffer.from("NINJA666")
    await program.methods
      .requestGroupManager(promo_code)
      .accounts({
        ...accounts
      })
      // .signers([manager])
      .rpc()
      .then(confirm)
      .then(log);
  });

  xit("approve_group_manager!", async () => {
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
    const productList = await program.account.storeProduct.all()
    console.log("productList", productList)
    const group_require = await program.account.priceRequirement.all()
    console.log("group_require",group_require)
    const manager_refund = new BN(5)
    const start_time = new BN(1733853000)
    const expired_time = new BN(1736853000)
    await program.methods
      .createGroupOrder(manager_refund, start_time, expired_time)
      .accounts({
        ...accounts
      })
      // .signers([manager])
      .rpc()
      .then(confirm)
      .then(log);
  });

  xit("buy_product!", async () => {
    // Add your test here.
    const amount = new BN(2)
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

  xit("cancel_product!", async () => {
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

  xit("buy_product!", async () => {
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

  xit("claim_product!", async () => {
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
