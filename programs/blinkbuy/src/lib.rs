pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("53cF82S7Q4VFiqAfSdbUdKbs5A5oD72efpZ8GUqsZvkX");

#[program]
pub mod blinkbuy {
    use super::*;

    pub fn create_store(ctx: Context<CreateStore>) -> Result<()> {
        ctx.accounts.create_store(&ctx.bumps)
    }

    pub fn add_product(ctx: Context<AddProduct>, total_issued_amount: u64, name: String, symbol: String, uri: String ) -> Result<()> {
        ctx.accounts.add_product(total_issued_amount, name, symbol, uri, &ctx.bumps)
    }

    pub fn update_total_issued_amount(ctx: Context<UpdateProduct>, total_issued_amount: u64) -> Result<()> {
        ctx.accounts.update_total_issued_amount(total_issued_amount)
    }

    pub fn add_price_requirement(ctx: Context<AddPriceRequirement>, min_amount: u64, max_amount: u64, price: u64, init_fee: u64) -> Result<()> {
        ctx.accounts.add_price_requirement(min_amount, max_amount, price, init_fee)
    }

    pub fn request_group_manager(ctx: Context<RequestGroupManager>, promo_code: Vec<u8>) -> Result<()> {
        ctx.accounts.request_group_manager(promo_code)
    }

    pub fn approve_group_manager(ctx: Context<ApproveGroupManager>) -> Result<()> {
        ctx.accounts.approve_group_manager()
    }

    pub fn create_group_order(ctx: Context<CreateGroupOrder>, manager_refund: u64, start_time: u64, num_requirement: u64, expired_time: u64) -> Result<()> {
        ctx.accounts.create_group_order(manager_refund, start_time, num_requirement, expired_time, &ctx.bumps)
    }

    pub fn buy_product(ctx: Context<BuyProduct>, amount: u64) -> Result<()> {
        ctx.accounts.buy_product(amount, &ctx.bumps)
    }

    pub fn cancel_request(ctx: Context<CancelRequest>) -> Result<()> {
        ctx.accounts.cancel_request()
    }

    pub fn claim_product(ctx: Context<ClaimProduct>) -> Result<()> {
        ctx.accounts.claim_product()
    }
}
