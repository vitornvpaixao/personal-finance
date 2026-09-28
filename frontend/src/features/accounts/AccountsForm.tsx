import { useState } from "react";

export function AccountsForm() {
    const [form, setForm ] = useState({
        name: "",
        balance: "",
        currency: "EUR"
    });
    const [error, setError] = useState<string | null>(null)

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        
        if (form.name.trim() === "") {
            setError('Name cannot be empty!'); 
            return;
        }

        const balance = Number(form.balance);

        if (form.balance.trim() === "" || !Number.isFinite(balance)) {
            setError("Balance must be a valid number!");
            return;
        }

        if (form.currency.trim() === "") {
            setError('Currency cannot be empty!'); 
            return;
        }
        
        const accountData = {
            name: form.name,
            balance,
            currency: form.currency
        }

        setError(null);
        console.log(accountData);
    }

    function handleClearForm() {
        setForm({
            name: "",
            balance: "",
            currency: "EUR"
        });

        setError(null);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>Account Form</div>

            <div>
                <label htmlFor="name">Name</label>
                <input 
                    id="name" 
                    type="text" 
                    value={form.name} 
                    onChange={(event) => {
                        setForm((prev) => ({
                            ...prev,
                            name: event.target.value
                        }))
                    }}
                />
            </div>

            <div>
                <label htmlFor="balance">Balance</label>
                <input 
                    id="balance" 
                    type="number"
                    step="0.01"
                    value={form.balance} 
                    onChange={(event) => {
                        setForm((prev) => ({
                            ...prev,
                            balance: event.target.value
                        }))
                    }}
                    />
            </div>

            <div>
                <label htmlFor="currency">Currency</label>
                <input 
                    id="currency" 
                    type="text" 
                    value={form.currency}
                    onChange={(event) => {
                        setForm((prev) => ({
                            ...prev,
                            currency: event.target.value
                        }))
                    }}
                />
            </div>

            <button type="submit">Create Account</button>
            <button type="button" onClick={handleClearForm}>Clear Form</button>
            
            {error && <div role="alert" style={{color: "red"}}>{error}</div>}
        </form>
    );
}