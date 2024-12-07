use anchor_lang::prelude::*;
use solana_program::clock::Clock;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{
        close_account, transfer_checked, CloseAccount, Mint, TokenAccount, TokenInterface,
        TransferChecked,
    },
};

use crate::GroupOrder;
use crate::GroupRequest;
use crate::error::ErrorCode;

#[derive(Accounts)]
pub struct CancelRequest<'info> {
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
        mut,
        associated_token::mint = mint,
        associated_token::authority = group_request,
        associated_token::token_program = token_program,
    )]
    pub vault_request: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(
        mut,
        close = buyer,
        has_one = buyer,
        seeds = [b"group_request", group_order.key().as_ref()],
        bump
    )]
    pub group_request: Account<'info, GroupRequest>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl CancelRequest<'_> {
    pub fn cancel_request(&mut self, amount: u64) -> Result<()> {
        require!(Clock::get().unix_timestamp < self.group_order.expired_time, ErrorCode::TimeIsOverError);
        let total_amount = self.group_order.price * amount;
        let signer_seeds: [&[&[u8]]; 1] = [&[
            b"group_request",
            self.group_order.to_account_info().key.as_ref(),
            &[self.group_request.bump],
        ]];
        let transfer_accounts = TransferChecked {
            from: self.vault_request.to_account_info(),
            mint: self.mint.to_account_info(),
            to: self.buyer_ata.to_account_info(),
            authority: self.group_request.to_account_info(),
        };

        let cpi_ctx = CpiContext::new_with_signer(
            self.token_program.to_account_info(), 
            transfer_accounts,
            &signer_seeds,
        );
        transfer_checked(cpi_ctx, total_amount, self.mint.decimals)?;

        let close_accounts = CloseAccount {
            account: self.vault_request.to_account_info(),
            destination: self.buyer.to_account_info(),
            authority: self.vault_request.to_account_info(),
        };

        let ctx = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            close_accounts,
            &signer_seeds,
        );

        close_account(ctx)
    }
}