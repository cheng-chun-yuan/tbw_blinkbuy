use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TokenInterface, TransferChecked},
};

use crate::GroupOrder;
use crate::GroupRequest;

#[derive(Accounts)]
pub struct BuyProduct<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut)]
    pub owner: SystemAccount<'info>,
    pub mint: InterfaceAccount<'info, Mint>,
    #[account(
        mut,
        seeds = [b"group_order", owner.key().as_ref(), group_order.num_order.to_le_bytes().as_ref()],
        bump
    )]
    pub group_order: Account<'info, GroupOrder>,
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = buyer,
        associated_token::token_program = token_program,
    )]
    pub buyer_ata: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(
        init,
        payer = buyer,
        associated_token::mint = mint,
        associated_token::authority = group_request,
        associated_token::token_program = token_program,
    )]
    pub vault_request: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(
        init,
        payer = buyer,
        space = 8 + GroupRequest::INIT_SPACE,
        seeds = [b"group_request", group_order.key().as_ref()],
        bump
    )]
    pub group_request: Account<'info, GroupRequest>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl BuyProduct<'_> {
    pub fn buy_product(&mut self, amount: u64, bumps: &BuyProductBumps) -> Result<()> {
        self.group_request.set_inner( GroupRequest {
            buyer: self.buyer.key(),
            group_order: self.group_order.key(),
            amount,
            bump: bumps.group_request,
        });
        let total_amount = self.group_order.price * amount;
        let transfer_accounts = TransferChecked {
            from: self.buyer_ata.to_account_info(),
            mint: self.mint.to_account_info(),
            to: self.vault_request.to_account_info(),
            authority: self.buyer.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(self.token_program.to_account_info(), transfer_accounts);
        transfer_checked(cpi_ctx, total_amount, self.mint.decimals);
        Ok(())
    }
}