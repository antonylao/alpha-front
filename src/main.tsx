import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './hooks/contexts/user.context.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserProvider>
      <QueryClientProvider client={new QueryClient}>
        <App />
      </QueryClientProvider>
    </UserProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
