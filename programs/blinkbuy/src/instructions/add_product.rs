use anchor_lang::prelude::*;
use anchor_spl::token_interface::{Mint, TokenInterface};
use crate::error::ErrorCode;
use crate::StoreCertificate;
use crate::StoreProduct;

#[derive(Accounts)]
pub struct AddProduct<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mint::token_program = token_program
    )]
    pub mint_nft: InterfaceAccount<'info, Mint>,
    #[account(
        mut,
        has_one = owner,
        seeds = [b"store", owner.key().as_ref()],
        bump
    )]
    pub store: Account<'info, StoreCertificate>,
    #[account(
        init,
        payer = owner,
        space = 8 + StoreProduct::INIT_SPACE,
        seeds = [b"store", store.key().as_ref(),store.num_product.to_le_bytes().as_ref()],
        bump
    )]
    pub new_product: Account<'info, StoreProduct>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl AddProduct<'_> {
    pub fn add_product(&mut self, total_issued_amount: u64) -> Result<()> {
        self.new_product.set_inner( StoreProduct {
            owner: self.owner.key(),
            mint_nft: self.mint_nft.key(),
            total_issued_amount,
            num_requirement: 0,
            reserved_amount: 0,
            sold_amount: 0,
        });
        self.store.num_product += 1;
        Ok(())
    }
    pub fn update_total_issued_amount(&mut self, total_issued_amount: u64) -> Result<()> {
        require!(total_issued_amount > self.new_product.sold_amount + self.new_product.reserved_amount, ErrorCode::UpdateAmountError);
        self.new_product.total_issued_amount = total_issued_amount;
        Ok(())
    }
}
