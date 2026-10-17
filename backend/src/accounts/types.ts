export type Account = {
    id: number;
    name: string;
    balance: number;
    currency: string;
};

export type CreateAccountInput = {
    name: string;
    balance: number;
    currency: string;
};

export type AccountRow = {
    id: number;
    name: string;
    balance: string;
    currency: string;
};
