export function formatCurrency (
    amount: number, 
    currency: string
): string {
    return Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: currency
    }).format(amount)  ;
}