import express  from 'express';
import { createAccount, getAccounts } from "./accountsRepository.js";
import type { Account, CreateAccountInput } from './types.js';

export const accountsRouter = express.Router();


accountsRouter.get('/', async (req, res) => {
    // Get all accounts from DB
    const result: Account[] = await getAccounts();
    
    res.json(result);
});

accountsRouter.post('/', async (req, res) => {
    const { name, balance, currency } = req.body ?? {};
    
    if (
        typeof name !== "string" ||
        name.trim() === "" || Number(name) ||
        typeof balance !== "number" ||
        !Number.isFinite(balance) ||
        typeof currency !== "string" ||
        currency.trim() === ""
    ) {
        res.status(400).json({ error: "Invalid account data" });
        return;
    }
    
    const accountData: CreateAccountInput = {
        name: name.trim(),
        balance,
        currency: currency.trim()
    }
    
    const newAccount: Account = await createAccount(accountData);
    
    res.status(201).json(newAccount);
})
