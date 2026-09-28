import { test, expect } from "vitest";
import { buildAccountsSummary } from "./buildAccountsSummary";
import type { Account } from "./types";

test("Groups and sums balences by currency", () => {
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
   
    const result = buildAccountsSummary(accounts);

    expect(result).toStrictEqual({
        "totalAccounts": 3,
        "totalsByCurrency": {
            "EUR": 1500,
            "USD": 10000,
        },
    })
})

test("Returns an empty summary when there are no accounts", () => {
    const accounts: Account[] = [];
    
    const result = buildAccountsSummary(accounts);

    expect(result).toStrictEqual({
        "totalAccounts": 0,
        "totalsByCurrency": {}
    })
})