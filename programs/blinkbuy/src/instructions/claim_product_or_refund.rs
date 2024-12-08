use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{mint_to, Mint, MintTo, TokenAccount, TokenInterface},
};

use crate::GroupRequest;
use crate::GroupOrder;
use crate::StoreProduct;
use crate::StoreCertificate;
use crate::PriceRequirement;

use crate::error::ErrorCode;

#[derive(Accounts)]
pub struct ClaimProductOrRefund<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut)]
    pub group_manager: SystemAccount<'info>,

    #[account(mut)]
    pub store_owner: SystemAccount<'info>,

    #[account(
        mut,
        seeds = [b"mint", product.key().as_ref()],
        bump,
        mint::decimals = 0,
        mint::authority = mint_nft,
        extensions::metadata_pointer::authority = store_owner,
        extensions::metadata_pointer::metadata_address = mint_nft,
    )]
    pub mint_nft: InterfaceAccount<'info, Mint>,

    #[account(
        mut,
        seeds = [b"store", store_owner.key().as_ref()],
        bump
    )]
    pub store: Box<Account<'info, StoreCertificate>>,

    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = mint_nft,
        associated_token::authority = buyer,
        associated_token::token_program = token_program,
    )]
    pub buyer_ata_nft: Box<InterfaceAccount<'info, TokenAccount>>,

    pub mint: InterfaceAccount<'info, Mint>,

    #[account(
        mut,
        seeds = [b"store", store.key().as_ref(),store.num_product.to_le_bytes().as_ref()],
        bump
    )]
    pub product: Account<'info, StoreProduct>,

    #[account(
        mut,
        has_one = price_requirement,
        seeds = [b"group_order", group_manager.key().as_ref(), group_order.num_order.to_le_bytes().as_ref()],
        bump
    )]
    pub group_order: Box<Account<'info, GroupOrder>>,
    #[account(
        mut,
        close = buyer,
        seeds = [b"group_request", group_order.key().as_ref(), buyer.key().as_ref()],
        bump
    )]
    pub group_request: Account<'info, GroupRequest>,

    #[account(
        mut,
        seeds = [b"price_requirement", product.key().as_ref(), product.num_requirement.to_le_bytes().as_ref()],
        bump
    )]
    pub price_requirement: Account<'info, PriceRequirement>,

    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = group_order,
        associated_token::token_program = token_program,
    )]
    pub vault_group_order: Box<InterfaceAccount<'info, TokenAccount>>,

    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

impl ClaimProductOrRefund<'_> {
    pub fn claim_product(&mut self) -> Result<()> {
        let clock = Clock::get().unwrap();
        let unix_timestamp = clock.unix_timestamp as u64;

        require!(unix_timestamp >= self.group_order.expired_time, ErrorCode::TimeIsNotOverError);
        require!(self.group_order.current_amount >= self.price_requirement.min_amount, ErrorCode::NotExceedMinError);

        let signer_seeds: [&[&[u8]]; 1] = [&[
            b"mint",
            self.store_owner.to_account_info().key.as_ref(),
            &[self.product.mint_bump],
        ]];

        let mint_accounts = MintTo {
            mint: self.mint_nft.to_account_info(),
            to: self.store_owner.to_account_info(),
            authority: self.mint_nft.to_account_info()
        };
        let ctx_mint = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            mint_accounts, 
            &signer_seeds,
        );
        mint_to(ctx_mint, self.group_request.amount)
    }
}