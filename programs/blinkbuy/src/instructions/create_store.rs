use anchor_lang::prelude::*;

use crate::StoreCertificate;

#[derive(Accounts)]
pub struct CreateStore<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        space = 8 + StoreCertificate::INIT_SPACE,
        seeds = [b"store", owner.key().as_ref()],
        bump
    )]
    pub store: Account<'info, StoreCertificate>,
    pub system_program: Program<'info, System>,
}

impl CreateStore<'_> {
    pub fn create_store(&mut self, bumps: &CreateStoreBumps) -> Result<()> {
        self.store.set_inner( StoreCertificate {
            owner: self.owner.key(),
            num_product: 0,
            num_manager: 0,
            bump: bumps.store,
        });
        Ok(())
    }
}