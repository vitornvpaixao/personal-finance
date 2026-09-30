import { useEffect, useState } from "react";
import type { Account } from './types';

import { AccountsList } from "./AccountsList";
import { AccountsSummary } from "./AccountsSummary";
import { AccountsForm } from "./AccountsForm";

async function getAccounts(): Promise<Account[]> {
    const res = await fetch('/api/accounts');

    if (!res.ok) {
        throw new Error('Error fetching accounts!');
    }

    return res.json();
}

export function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [initialError, setInitialError] = useState<string | null>(null);
    const [refreshError, setRefreshError] = useState<string | null>(null);
    
    async function refreshAccounts() {
        try {
            const data = await getAccounts();

            setAccounts(data);
            setRefreshError(null);
        } catch {
            setRefreshError("Account created, but the list could not be refreshed.");
        }
    }

    useEffect(() => {
        let cancelled = false;
        
        getAccounts().then((data) => {
            if (cancelled) return;

            setAccounts(data);
            setInitialError(null);
        }).catch((err) => {
            if (!cancelled) {
                setInitialError(err instanceof Error ? err.message : "Something went wrong!");
            }
        }).finally(() => {
            if (!cancelled) {
                setLoading(false);
            }
        });

        return () => {
            cancelled = true;
        }
    }, []);

    if (loading) return <div>Loading...</div>;

    if (initialError) return <div>{initialError}</div>;

    return (
        <div>
            <AccountsList accounts={accounts} />
            <AccountsSummary accounts={accounts} />
            <AccountsForm onCreated={refreshAccounts}/>
            {refreshError && (<div role="alert">{refreshError}</div>)}
        </div>
    );
}
