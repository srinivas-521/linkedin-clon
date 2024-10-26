import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
const quaryClient= new QueryClient();

//UseQuary to fetch data 
//useMutation  to update data
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={quaryClient}>
      <App />
    </QueryClientProvider>
    </BrowserRouter>
     

  </StrictMode>,
)
