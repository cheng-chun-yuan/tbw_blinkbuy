import { Button } from "@/components/ui/button";
import {
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Program, BN,  AnchorProvider, setProvider } from "@coral-xyz/anchor";
import AnchorAirdropEscrowJson from "@/app/idl/anchor_airdrop_escrow.json";
import { type AnchorAirdropEscrow} from "@/app/idl/anchor_airdrop_escrow";
import {
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export function Faucet() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const provider = wallet ? new AnchorProvider(connection, wallet, {}) : null;
  if (provider) {
    setProvider(provider);
  }
  const program = provider ? new Program(AnchorAirdropEscrowJson as AnchorAirdropEscrow, provider) : null;
  const handleClaimFaucet = async () => {
    if (!program || !wallet) return 
    const mintBonk = new PublicKey("Aqk2sTGwLuojdYSHDLCXgidGNUQeskWS2JbKXPksHdaG")
    const escrow= new PublicKey("GSpuFKexnLiDoU5J29ZK5NK9TDtBiMwHSV33U4fb2Lza") 
    const claimerAta = getAssociatedTokenAddressSync(mintBonk, wallet.publicKey, false, TOKEN_2022_PROGRAM_ID)
    const vault = getAssociatedTokenAddressSync(mintBonk, escrow, true, TOKEN_2022_PROGRAM_ID)
    const frens = PublicKey.findProgramAddressSync(
      [Buffer.from("frens"), wallet.publicKey.toBuffer(), escrow.toBuffer()],
      program.programId
    )[0];
    await program.methods
      .claim()
      .accountsStrict({
        claimer: wallet.publicKey,
        mint: mintBonk,
        claimerAta,
        escrow,
        frens,
        vault,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId
      })
      .rpc()

    
    // You can redirect to a checkout page or process the purchase here
  };
  return (
        <>
          <Button
            asChild
            onClick={handleClaimFaucet}
            variant="secondary"
            className="bg-blue-400 text-white hover:bg-blue-500"
          >
            <span>Faucet</span>
          </Button>
        </>
  );
}
