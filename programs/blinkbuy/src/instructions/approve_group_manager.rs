use anchor_lang::prelude::*;

use crate::StoreCertificate;
use crate::GroupManagerCertificate;

#[derive(Accounts)]
pub struct ApproveGroupManager<'info> {
    #[account(mut)]
    pub store_owner: Signer<'info>,
    #[account(mut)]
    pub manager: SystemAccount<'info>,
    #[account(
        mut,
        has_one = store_owner,
        seeds = [b"store", store_owner.key().as_ref()],
        bump
    )]
    pub store: Box<Account<'info, StoreCertificate>>,
    #[account(
        mut,
        seeds = [b"store",store.key().as_ref(), manager.key().as_ref()],
        bump
    )]
    pub group_manager_certificate: Box<Account<'info, GroupManagerCertificate>>,
    pub system_program: Program<'info, System>,
}

impl ApproveGroupManager<'_> {
    pub fn approve_group_manager(&mut self) -> Result<()> {
        self.group_manager_certificate.activated = true;
        self.store.num_manager += 1;
        Ok(())
    }
}
