import { useState } from "react";

interface AccountsFormProps {
    onCreated: () => void;
}

export function AccountsForm({ onCreated }: AccountsFormProps) {
    const [form, setForm ] = useState({
        name: "",
        balance: "",
        currency: "EUR"
    });
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSubmitting) return;

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
            name: form.name.trim(),
            balance,
            currency: form.currency.trim()
        }

        setIsSubmitting(true);

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(accountData)
            };
            
            const res = await fetch('/api/accounts', requestOptions);
            
            if (!res.ok) {
                throw new Error('Error creating account!');
            }

            handleClearForm();
            onCreated();
            
        } catch(err) {
            setError(err instanceof Error ? err.message : 'Something went wrong!');
        } finally {
            setIsSubmitting(false);
        }
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
                    className="border border-gray-400 rounded-md px-2 py-1 mb-2 ml-2"
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
                    className="border border-gray-400 rounded-md px-2 py-1 mb-2 ml-2"
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
                    className="border border-gray-400 rounded-md px-2 py-1 mb-2 ml-2"
                    onChange={(event) => {
                        setForm((prev) => ({
                            ...prev,
                            currency: event.target.value
                        }))
                    }}
                />
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting}
                className="rounded-xl bg-blue-500 text-white px-2 py-0.5 mx-2 cursor-pointer"
            >
                {isSubmitting ? (
                    <>
                        <span style={{backgroundColor: 'gray'}}>Creating...</span>
                    </>
                ) : "Create Account"}
            </button>
            
            <button 
                type="button" 
                onClick={handleClearForm}
                className="rounded-xl bg-blue-500 text-white px-2 py-0.5 mx-2 cursor-pointer"
            >
                Clear Form
            </button>
            
            {error && <div role="alert" style={{color: "red"}}>{error}</div>}
        </form>
    );
}
