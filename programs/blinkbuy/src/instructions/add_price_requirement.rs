use anchor_lang::prelude::*;
use anchor_spl::token_interface::{Mint, TokenInterface};

use crate::PriceRequirement;
use crate::StoreCertificate;
use crate::StoreProduct;

#[derive(Accounts)]
pub struct AddPriceRequirement<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mint::token_program = token_program
    )]
    pub currency: InterfaceAccount<'info, Mint>,
    #[account(
        init,
        payer = owner,
        space = 8 + PriceRequirement::INIT_SPACE,
        seeds = [b"price_requirement", product.key().as_ref(), product.num_requirement.to_le_bytes().as_ref()],
        bump
    )]
    pub price_requirement: Account<'info, PriceRequirement>,
    #[account(
        mut,
        seeds = [b"store", owner.key().as_ref()],
        bump
    )]
    pub store: Account<'info, StoreCertificate>,
    #[account(
        mut,
        seeds = [b"store", store.key().as_ref(),store.num_product.to_le_bytes().as_ref()],
        bump
    )]
    pub product: Account<'info, StoreProduct>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl AddPriceRequirement<'_> {
    pub fn add_price_requirement(&mut self, min_amount: u64, max_amount: u64, price: u64, init_fee: u64) -> Result<()> {
        self.price_requirement.set_inner( PriceRequirement {
            product_id: self.product.key(),
            min_amount,
            max_amount,
            price,
            currency: self.currency.key(),
            init_fee,
        });
        self.store.num_product += 1;
        self.product.num_requirement += 1;
        Ok(())
    }
}