use anchor_lang::prelude::*;
use crate::PriceRequirement;
use crate::StoreCertificate;
use crate::GroupManagerCertificate;
use crate::GroupOrder;
use crate::StoreProduct;

#[derive(Accounts)]
pub struct CreateGroupOrder<'info> {
    #[account(mut)]
    pub manager: Signer<'info>,
    #[account(mut)]
    pub store_owner: SystemAccount<'info>,
    #[account(
        seeds = [b"store_product", store.key().as_ref(), product.num_product.to_le_bytes().as_ref()],
        bump
    )]
    pub product: Box<Account<'info, StoreProduct>>,
    #[account(
        seeds = [b"price_requirement", product.key().as_ref(), price_requirement.num_requirement.to_le_bytes().as_ref()],
        bump
    )]
    pub price_requirement: Box<Account<'info, PriceRequirement>>,
    #[account(
        mut,
        seeds = [b"store", store_owner.key().as_ref()],
        bump
    )]
    pub store: Box<Account<'info, StoreCertificate>>,
    #[account(
        mut,
        has_one = manager,
        seeds = [b"store",store.key().as_ref(), manager.key().as_ref()],
        bump
    )]
    pub group_manager_certificate: Box<Account<'info, GroupManagerCertificate>>,
    #[account(
        init,
        payer = manager,
        space = 8 + GroupOrder::INIT_SPACE,
        seeds = [b"group_order", manager.key().as_ref(), group_manager_certificate.num_order.to_le_bytes().as_ref()],
        bump
    )]
    pub group_order: Box<Account<'info, GroupOrder>>,
    pub system_program: Program<'info, System>,
}

impl CreateGroupOrder<'_> {
    pub fn create_group_order(&mut self, manager_refund: u64, start_time: u64, num_requirement: u64, expired_time: u64, bumps: &CreateGroupOrderBumps) -> Result<()> {
        let price = self.price_requirement.price * ( 100 + manager_refund ) / 100;
        self.group_order.set_inner( GroupOrder {
            num_order: self.group_manager_certificate.num_order,
            manager: self.manager.key(),
            num_requirement,
            group_manager_certificate: self.group_manager_certificate.key(),
            current_amount: 0,
            manager_refund,
            start_time,
            expired_time,
            min_amount: self.price_requirement.min_amount,
            max_amount: self.price_requirement.max_amount,
            currency: self.price_requirement.currency.key(),
            price,
            bump: bumps.group_order,
        });
        self.product.reserved_amount += self.price_requirement.max_amount;
        Ok(())
    }
}