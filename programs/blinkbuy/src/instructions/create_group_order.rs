use anchor_lang::prelude::*;

use crate::PriceRequirement;
use crate::StoreCertificate;
use crate::GroupManagerCertificate;
use crate::GroupOrder;

#[derive(Accounts)]
pub struct CreateGroupOrder<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        seeds = [b"store", owner.key().as_ref()],
        bump
    )]
    pub price_requirement: Account<'info, PriceRequirement>,
    #[account(
        mut,
        has_one = owner,
        seeds = [b"store", owner.key().as_ref()],
        bump
    )]
    pub store: Account<'info, StoreCertificate>,
    #[account(
        mut,
        has_one = owner,
        seeds = [b"store",store.key().as_ref(), owner.key().as_ref()],
        bump
    )]
    pub group_manager_certificate: Account<'info, GroupManagerCertificate>,
    #[account(
        init,
        payer = owner,
        space = 8 + GroupOrder::INIT_SPACE,
        seeds = [b"store", owner.key().as_ref()],
        bump
    )]
    pub group_order: Account<'info, GroupOrder>,
    pub system_program: Program<'info, System>,
}

impl CreateGroupOrder<'_> {
    pub fn create_group_order(&mut self, manager_refund: u64, start_time: u64, expired_time: u64, price: u64, bumps: &CreateGroupOrderBumps) -> Result<()> {
        self.group_order.set_inner( GroupOrder {
            group_manager: self.owner.key(),
            price_requirement: self.price_requirement.key(),
            group_manager_certificate: self.group_manager_certificate.key(),
            current_amount: 0,
            manager_refund,
            start_time,
            expired_time,
            price,
            bump: bumps.group_order,
        });
        Ok(())
    }
}