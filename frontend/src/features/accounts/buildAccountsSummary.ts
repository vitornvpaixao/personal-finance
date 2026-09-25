import type { Account } from "./types";

interface AccountsSummary {
    totalAccounts: number;
    totalsByCurrency: Record<string, number>;
}

export function buildAccountsSummary(
    accounts: Account[]
): AccountsSummary {
    return accounts.reduce<AccountsSummary>((acc, cur) => {
        acc.totalsByCurrency[cur.currency] = (acc.totalsByCurrency[cur.currency] ?? 0) + cur.balance;
        
        return acc;
    }, {
        totalAccounts: accounts.length,
        totalsByCurrency: {}
    })
}
