import { query } from '../db.js';
import type { Account, CreateAccountInput, AccountRow } from './types.js';

export async function getAccounts(): Promise<Account[]> {
    const result: AccountRow[] = await query(
        "SELECT * FROM accounts;"
    );

    return result.map(normalizeAccountData);
}

export async function createAccount({name, balance, currency}: CreateAccountInput): Promise<Account> {
    const result: AccountRow[] = await query(
        `INSERT INTO accounts (name, balance, currency) 
        VALUES ($1, $2, $3) 
        RETURNING id, name, balance, currency`, 
        [name, balance, currency]
    );

    const createdAccount: AccountRow | undefined = result[0];

    if (!createdAccount) {
        throw new Error('Account was not returned after creation');
    }

    return normalizeAccountData(createdAccount);
}

function normalizeAccountData(account: AccountRow): Account {
    return {
        ...account,
        balance: Number(account.balance)
    };
}
