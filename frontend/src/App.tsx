import { Routes, Route, Navigate } from 'react-router'

import { AccountsPage } from './features/accounts/AccountsPage'
import { ExpensesPage } from './features/expenses/ExpensesPage.tsx'
import { AppLayout } from './app/AppLayout.tsx'

function App() {
	return (
		<Routes>
			<Route path="/" element= {<AppLayout />}>
				<Route index element={<Navigate to="/accounts" replace />} />
				<Route path='accounts' element= {<AccountsPage />}/>
				<Route path='expenses' element= {<ExpensesPage />}/>
			</Route>
		</Routes>
	)
}

export default App;
