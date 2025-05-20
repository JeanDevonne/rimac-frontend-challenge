import Router from './routes/Router'
import { UserProvider } from './contexts'

export default function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  )
}