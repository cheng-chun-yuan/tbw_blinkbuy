use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Custom error message")]
    CustomError,
    #[msg("Update amount is less than current minimum amount")]
    UpdateAmountError,
    #[msg("min value should be lower than max value")]
    MinLargerThanMaxError,
    #[msg("the group order is already finished")]
    TimeIsOverError,
    #[msg("the group order is not finished")]
    TimeIsNotOverError,
    #[msg("Not fulfill the min requirement")]
    NotExceedMinError,
    #[msg("Exceed the max requirement")]
    ExceedMaxError,
}
