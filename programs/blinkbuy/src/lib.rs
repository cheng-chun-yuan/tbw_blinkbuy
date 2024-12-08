pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("GZrGD3afkm4iNTtz1fhLJJX1VViuu2q1pd9aRRdUfBEr");

#[program]
pub mod blinkbuy {
    use super::*;

    pub fn create_store(ctx: Context<CreateStore>) -> Result<()> {
        ctx.accounts.create_store(&ctx.bumps)
    }

    pub fn add_product(ctx: Context<AddProduct>, total_issued_amount: u64, name: String, symbol: String, uri: String ) -> Result<()> {
        ctx.accounts.add_product(total_issued_amount, name, symbol, uri, &ctx.bumps)
    }

    pub fn update_total_issued_amount(ctx: Context<AddProduct>, total_issued_amount: u64) -> Result<()> {
        ctx.accounts.update_total_issued_amount(total_issued_amount)
    }

    pub fn request_group_manager(ctx: Context<RequestGroupManager>, promo_code: Vec<u8>) -> Result<()> {
        ctx.accounts.request_group_manager(promo_code)
    }

    pub fn approve_group_manager(ctx: Context<ApproveGroupManager>) -> Result<()> {
        ctx.accounts.approve_group_manager()
    }
}
