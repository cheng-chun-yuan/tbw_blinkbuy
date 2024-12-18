use anchor_lang::prelude::*;

use crate::StoreCertificate;

#[derive(Accounts)]
pub struct CreateStore<'info> {
    #[account(mut)]
    pub store_owner: Signer<'info>,
    #[account(
        init,
        payer = store_owner,
        space = 8 + StoreCertificate::INIT_SPACE,
        seeds = [b"store", store_owner.key().as_ref()],
        bump
    )]
    pub store: Box<Account<'info, StoreCertificate>>,
    pub system_program: Program<'info, System>,
}

impl CreateStore<'_> {
    pub fn create_store(&mut self, bumps: &CreateStoreBumps) -> Result<()> {
        self.store.set_inner( StoreCertificate {
            store_owner: self.store_owner.key(),
            num_product: 0,
            num_manager: 0,
            bump: bumps.store,
        });
        Ok(())
    }
}