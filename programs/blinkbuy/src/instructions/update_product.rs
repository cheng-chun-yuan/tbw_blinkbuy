use anchor_lang::prelude::*;

use crate::error::ErrorCode;
use crate::StoreCertificate;
use crate::StoreProduct;

#[derive(Accounts)]
pub struct UpdateProduct<'info> {
    #[account(mut)]
    pub store_owner: Signer<'info>,
    #[account(
        has_one = store_owner,
        seeds = [b"store", store_owner.key().as_ref()],
        bump
    )]
    pub store: Box<Account<'info, StoreCertificate>>,
    
    #[account(
        mut,
        seeds = [b"store_product", store.key().as_ref(), product.num_product.to_le_bytes().as_ref()],
        bump = product.bump
    )]
    pub product: Account<'info, StoreProduct>,
    pub system_program: Program<'info, System>,
}

impl UpdateProduct<'_> {
    pub fn update_total_issued_amount(&mut self, total_issued_amount: u64) -> Result<()> {
        require!(self.product.total_issued_amount != 0, ErrorCode::NotInitError);
        require!(total_issued_amount > self.product.sold_amount + self.product.reserved_amount, ErrorCode::UpdateAmountError);
        self.product.total_issued_amount = total_issued_amount;
        Ok(())
    }
}
