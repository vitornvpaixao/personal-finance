import { query } from '../db.js';

type Account = {
    name: string;
    balance: number;
    currency: string;
}

export async function getAccounts() {
    const result = await query(
        "SELECT * FROM accounts;"
    );

    return result;
}

export async function createAccount({name, balance, currency}: Account) {
    const result = await query(
        `INSERT INTO accounts (name, balance, currency) 
        VALUES ($1, $2, $3) 
        RETURNING id, name, balance, currency`, 
        [name, balance, currency]
    );

    console.log(result);
}