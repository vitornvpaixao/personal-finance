import { useEffect, useState } from "react";
import type { Account } from './types';

import { AccountsList } from "./AccountsList";
import { AccountsSummary } from "./AccountsSummary";

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

    return (
        <div>
            <AccountsList accounts={accounts} />
            <AccountsSummary accounts={accounts} />
        </div>
    );
}
