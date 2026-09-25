import type { Account } from "./types"
import { formatCurrency } from "../../shared/utils/formatCurrency";

interface AccountsListProps {
    accounts: Account[];
}
export function AccountsList({ accounts }: AccountsListProps) {
    if (accounts.length === 0) {
        return (
            <div>
                <h2>Accounts</h2>
                <div>No Accounts Found!</div>
            </div>
        );
    }

    return (
        <div>
            <h2>Accounts</h2>

            {accounts.map((account) => (
                <div key={account.id}>
                    <div>{account.name}</div>
                    <div>{formatCurrency(account.balance, account.currency)}</div>
                    <br />
                </div>
                
            ))}
        </div>
    );
}
