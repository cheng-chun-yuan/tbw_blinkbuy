use anchor_lang::prelude::*;
use anchor_lang::{
    solana_program::rent::{DEFAULT_EXEMPTION_THRESHOLD, DEFAULT_LAMPORTS_PER_BYTE_YEAR},
    system_program::{transfer, Transfer},
};
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{
        token_metadata_initialize, Mint, TokenInterface, TokenMetadataInitialize,
    },
};
use spl_token_metadata_interface::state::TokenMetadata;

use crate::StoreCertificate;
use crate::StoreProduct;

#[derive(Accounts)]
pub struct AddProduct<'info> {
    #[account(mut)]
    pub store_owner: Signer<'info>,
    #[account(
        init_if_needed,
        payer = store_owner,
        seeds = [b"mint", product.key().as_ref()],
        bump,
        mint::decimals = 0,
        mint::authority = mint_nft,
        extensions::metadata_pointer::authority = store_owner,
        extensions::metadata_pointer::metadata_address = mint_nft,
    )]
    pub mint_nft: InterfaceAccount<'info, Mint>,
    #[account(
        mut,
        has_one = store_owner,
        seeds = [b"store", store_owner.key().as_ref()],
        bump, 
    )]
    pub store: Box<Account<'info, StoreCertificate>>,
    
    #[account(
        init,
        payer = store_owner,
        space = 8 + StoreProduct::INIT_SPACE,
        seeds = [b"store_product", store.key().as_ref(), store.num_product.to_le_bytes().as_ref()],
        bump,
    )]
    pub product: Account<'info, StoreProduct>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl AddProduct<'_> {
    pub fn add_product(&mut self, total_issued_amount: u64, name: String, symbol: String, uri: String, bumps: &AddProductBumps) -> Result<()> {
        self.product.set_inner( StoreProduct {
            num_product: self.store.num_product,
            owner: self.store_owner.key(),
            mint_nft: self.mint_nft.key(),
            total_issued_amount,
            num_requirement: 0,
            reserved_amount: 0,
            sold_amount: 0,
            bump: bumps.product,
            mint_bump: bumps.mint_nft
        });
        self.store.num_product += 1;
        let token_metadata = TokenMetadata {
            name: name.clone(),
            symbol: symbol.clone(),
            uri: uri.clone(),
            ..Default::default()
        };
        let data_len = token_metadata.tlv_size_of()? - 8;
        let lamports = data_len as u64 * DEFAULT_LAMPORTS_PER_BYTE_YEAR * DEFAULT_EXEMPTION_THRESHOLD as u64;
        // Transfer additional lamports to mint account
        transfer(
            CpiContext::new(
                self.system_program.to_account_info(),
                Transfer {
                    from: self.store_owner.to_account_info(),
                    to: self.mint_nft.to_account_info(),
                },
            ),
            lamports,
        )?;
        let signer_seeds: [&[&[u8]]; 1] = [&[
            b"mint",
            self.product.to_account_info().key.as_ref(),
            &[bumps.mint_nft],
        ]];
        let init_mint_accounts = TokenMetadataInitialize {
            token_program_id: self.token_program.to_account_info(),
            mint: self.mint_nft.to_account_info(),
            metadata: self.mint_nft.to_account_info(),
            mint_authority: self.mint_nft.to_account_info(),
            update_authority: self.store_owner.to_account_info(),
        };
        let ctx = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            init_mint_accounts,
            &signer_seeds,
        );
        token_metadata_initialize(ctx, name, symbol, uri)
    }
}
