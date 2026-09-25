import express  from 'express';

const app = express();

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
    }
]

app.get('/api/accounts', (req, res) => {
  res.json(accounts);
});

app.listen(3000);
