import express  from 'express';

const app = express();

app.use(express.json());

type Account = {
    id: number;
    name: string;
    balance: number;
    currency: string;
}

const accounts: Account[] = [
    {
        id: 1,
        name: 'João',
        balance: 1000,
        currency: 'EUR'
    },
    {
        id: 2,
        name: 'António',
        balance: 10000,
        currency: 'USD'
    },
    {
        id: 3,
        name: "André",
        balance: 500,
        currency: "EUR"
    }
]

app.get('/api/accounts', (req, res) => {
  res.json(accounts);
});

app.post('/api/accounts', (req, res) => {
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
    
    const newAccount: Account = {
        id: accounts.reduce((max, account) => Math.max(max, account.id), 0) + 1,
        name: name.trim(),
        balance,
        currency: currency.trim()
    }

    accounts.push(newAccount)
    
    res.status(201).json(newAccount);
})

app.listen(3000);
