use anchor_lang::prelude::*;

declare_id!("4iZPpi28h4K5MpcNxjpwrJdQqgTUQmtiHM24zbagsheX");

#[program]
pub mod cricket_clash_gems {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let gem_account = &mut ctx.accounts.gem_account;
        gem_account.total_supply = 0;
        Ok(())
    }

    pub fn mint(ctx: Context<Mint>, amount: u64) -> ProgramResult {
        let gem_account = &mut ctx.accounts.gem_account;
        gem_account.total_supply += amount;
        gem_account.balances[ctx.accounts.to.key()] += amount;
        Ok(())
    }

    pub fn burn(ctx: Context<Burn>, amount: u64) -> ProgramResult {
        let gem_account = &mut ctx.accounts.gem_account;
        let balance = gem_account.balances[ctx.accounts.from.key()];
        if balance < amount {
            return Err(ErrorCode::InsufficientFunds.into());
        }
        gem_account.total_supply -= amount;
        gem_account.balances[ctx.accounts.from.key()] -= amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init)]
    pub gem_account: ProgramAccount<'info, GemAccount>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Mint<'info> {
    pub gem_account: ProgramAccount<'info, GemAccount>,
    pub to: Signer<'info>,
}

#[derive(Accounts)]
pub struct Burn<'info> {
    pub gem_account: ProgramAccount<'info, GemAccount>,
    pub from: Signer<'info>,
}

#[account]
pub struct GemAccount {
    pub total_supply: u64,
    pub balances: [u64; 32],  // Simplified, consider using a proper mapping or storage solution
}

#[error]
pub enum ErrorCode {
    #[msg("Insufficient funds.")]
    InsufficientFunds,
}
