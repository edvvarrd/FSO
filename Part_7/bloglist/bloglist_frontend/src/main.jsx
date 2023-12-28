import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './context/notificationContext'
import { LoginContextProvider } from './context/loginContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<NotificationContextProvider>
			<LoginContextProvider>
				<Router>
					<App />
				</Router>
			</LoginContextProvider>
		</NotificationContextProvider>
	</QueryClientProvider>
)
