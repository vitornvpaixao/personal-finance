import { Outlet, NavLink } from "react-router";

export function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="h-12 bg-white text-center flex justify-center items-center">
                Header
            </header>

            <div className="flex flex-1">
                <aside className="w-50 bg-slate-700 text-white p-4">
                    <h1 className="font-bold mb-6">Menu</h1>
                    
                    <nav className="flex flex-col gap-2">
                        <NavLink
                            to="/accounts"
                            className={( {isActive} ) => 
                                isActive
                                    ? "bg-slate-500 rounded px-3 py-2"
                                    : "px-3 py-2"
                            }
                        >
                            Accounts
                        </NavLink>

                        <NavLink
                            to="/expenses"
                            className={( {isActive} ) => 
                                isActive
                                    ? "bg-slate-500 rounded px-3 py-2"
                                    : "px-3 py-2"
                            }
                        >
                            Expenses
                        </NavLink>
                    </nav>
                </aside>

                <main className="flex-1 bg-slate-950 p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}