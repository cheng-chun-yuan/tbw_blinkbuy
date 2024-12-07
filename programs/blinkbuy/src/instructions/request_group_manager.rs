use anchor_lang::prelude::*;

use crate::StoreCertificate;
use crate::GroupManagerCertificate;

#[derive(Accounts)]
pub struct RequestGroupManager<'info> {
    #[account(mut)]
    pub manager: Signer<'info>,
    #[account(mut)]
    pub owner: SystemAccount<'info>,
    #[account(
        seeds = [b"store", owner.key().as_ref()],
        bump
    )]
    pub store: Account<'info, StoreCertificate>,
    #[account(
        init,
        payer = manager,
        space = 8 + GroupManagerCertificate::INIT_SPACE,
        seeds = [b"store",store.key().as_ref(), manager.key().as_ref()],
        bump
    )]
    pub group_manager_certificate: Account<'info, GroupManagerCertificate>,
    pub system_program: Program<'info, System>,
}

impl RequestGroupManager<'_> {
    pub fn request_group_manager(&mut self, promo_code: Vec<u8>) -> Result<()> {
        self.group_manager_certificate.set_inner( GroupManagerCertificate {
            store: self.store.key(),
            promo_code,
            owner: self.owner.key(),
            num_order: 0,
            activated: false,
        });
        Ok(())
    }
}