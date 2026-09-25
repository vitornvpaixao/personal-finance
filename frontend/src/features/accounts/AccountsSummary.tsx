import type { Account } from "./types";
import { buildAccountsSummary } from "./buildAccountsSummary";
import { formatCurrency } from "../../shared/utils/formatCurrency";

interface AccountsSummaryProps {
    accounts: Account[];
}

export function AccountsSummary({ accounts }: AccountsSummaryProps) {
    const accountsSummary = buildAccountsSummary(accounts);
    
    return (
        <div>
            <h2>Summary</h2>

            <div>{accountsSummary.totalAccounts} Accounts</div>
            <br />
            <div>{Object.entries(accountsSummary.totalsByCurrency).map(([currency, val]) => ( 
                <div key={currency}>
                    {formatCurrency(val, currency)}
                </div>
            ))}</div>
        </div>
    )
}
