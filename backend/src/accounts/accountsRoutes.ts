import express  from 'express';
import { createAccount, getAccounts } from "./accountsRepository.js";

export const accountsRouter = express.Router();

type Account = {
    name: string;
    balance: number;
    currency: string;
}

accountsRouter.get('/', async (req, res) => {
    // Get all accounts from DB
    const result = await getAccounts();
    
    res.json(result);
});

accountsRouter.post('/', async (req, res) => {
    const { name, balance, currency} = req.body ?? {};
    
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
    
    const accountData: Account = {
        name: name.trim(),
        balance,
        currency: currency.trim()
    }
    
    const newAccount = await createAccount(accountData);
    
    res.status(201).json(newAccount);
})
