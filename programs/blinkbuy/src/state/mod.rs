
use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct StoreCertificate {
    pub owner: Pubkey,
    pub num_product: u8,
    pub num_manager: u8,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct StoreProduct {
    pub owner: Pubkey,
    pub mint_nft: Pubkey,
    pub total_issued_amount: u64,
    pub reserved_amount: u64,
    pub sold_amount: u64, 
    pub num_requirement: u8,
}

#[account]
#[derive(InitSpace)]
pub struct PriceRequirement {
    pub product_id: Pubkey,
    pub min_amount: u64,
    pub max_amount: u64,
    pub price: u64,
    pub currency: Pubkey,
    pub init_fee: u64,
}

#[account]
#[derive(InitSpace)]
pub struct GroupManagerCertificate {
    pub store: Pubkey,
    #[max_len(8, 8)]
    pub promo_code: Vec<u8>,
    pub owner: Pubkey,
    pub num_order: u8,
    pub activated: bool,
}

#[account]
#[derive(InitSpace)]
pub struct GroupOrder {
    pub group_manager: Pubkey,
    pub price_requirement: Pubkey,
    pub group_manager_certificate: Pubkey,
    pub current_amount: u64,
    pub manager_refund: u64,
    pub start_time: u64,
    pub expired_time: u64,
    pub price: u64,
    pub num_order: u8,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct GroupRequest {
    pub buyer: Pubkey,
    pub group_order: Pubkey,
    pub amount: u64,
    pub bump: u8,
}


#[account]
#[derive(InitSpace)]
pub struct MembershipCard {
    pub total_spent: u64,
    pub owner: Pubkey,
    pub last_updated: u64,
}



// get approval and list product
//  groupmanager choose product and amount and create a group order
// go to the shop buy product get NFT
// so we need 
// - StoreCertificate (eligible store), 
// - StoreProduct (total amount, hold amount,), 
// - PriceRequirement  (amount point to price - should include min and max)
// - GroupManagerCertificate (eligible to create group order)
// - GroupOrder (record requirement_id, current amount, mint_product)
// - MembershipCard (total_amount) like loyalty point