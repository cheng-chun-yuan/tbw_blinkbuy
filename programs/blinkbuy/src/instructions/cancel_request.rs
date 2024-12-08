use anchor_lang::prelude::*;
use anchor_lang::prelude::Clock;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{
        transfer_checked, Mint, TokenAccount, TokenInterface,
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
    pub currency: InterfaceAccount<'info, Mint>,
    #[account(
        mut,
        has_one = currency,
        seeds = [b"group_order", owner.key().as_ref(), group_order.num_order.to_le_bytes().as_ref()],
        bump
    )]
    pub group_order: Box<Account<'info, GroupOrder>>,
    #[account(
        mut,
        associated_token::mint = currency,
        associated_token::authority = buyer,
        associated_token::token_program = token_program,
    )]
    pub buyer_ata: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(
        mut,
        associated_token::mint = currency,
        associated_token::authority = group_order,
        associated_token::token_program = token_program,
    )]
    pub vault_group_order: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(
        mut,
        close = buyer,
        has_one = buyer,
        has_one = group_order,
        seeds = [b"group_request", group_order.key().as_ref()],
        bump
    )]
    pub group_request: Account<'info, GroupRequest>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl CancelRequest<'_> {
    pub fn cancel_request(&mut self) -> Result<()> {
        let clock = Clock::get().unwrap();
        let unix_timestamp = clock.unix_timestamp as u64;
        if self.group_order.current_amount >= self.group_order.min_amount {
            require!(unix_timestamp < self.group_order.expired_time, ErrorCode::TimeIsOverError);
        }
        self.group_order.current_amount -= self.group_request.amount;
        let total_amount = self.group_order.price * self.group_request.amount;
        let signer_seeds: [&[&[u8]]; 1] = [&[
            b"group_order",
            self.owner.to_account_info().key.as_ref(),
            &self.group_order.num_order.to_le_bytes()[..],
            &[self.group_order.bump],
        ]];
        let transfer_accounts = TransferChecked {
            from: self.vault_group_order.to_account_info(),
            mint: self.currency.to_account_info(),
            to: self.buyer_ata.to_account_info(),
            authority: self.group_order.to_account_info(),
        };

        let cpi_ctx = CpiContext::new_with_signer(
            self.token_program.to_account_info(), 
            transfer_accounts,
            &signer_seeds,
        );
        transfer_checked(cpi_ctx, total_amount, self.currency.decimals)
    }
}