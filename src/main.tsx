import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './hooks/contexts/user.context.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { VolunteerEventTypesToggledProvider } from './hooks/contexts/volunteerEventTypesToggled.context.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <VolunteerEventTypesToggledProvider>
      <UserProvider>
        <QueryClientProvider client={new QueryClient}>
          <App />
        </QueryClientProvider>
      </UserProvider>
    </VolunteerEventTypesToggledProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
