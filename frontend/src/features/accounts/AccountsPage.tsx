import { useEffect, useState } from "react";
import type { Account } from './types';

export function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        async function fetchAccounts() {
            try {
                const res = await fetch('/api/accounts');
                
                if (!res.ok) {
                    throw new Error('Something went wrong - BE error!');
                }
    
                const data: Account[] = await res.json();
                setAccounts(data);
                
            } catch(err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Something went wrong!');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchAccounts();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>;

    if (accounts.length === 0) return <div>No Accounts Found!</div>

    return (
        <div>
            <h1>Accounts</h1>

            {accounts.map(account => (
                <div key={account.id}>
                    <div>{account.name}</div>
                    <div>{account.balance}</div>
                    <div>{account.currency}</div>
                </div>
            ))}
        </div>
    );
}
