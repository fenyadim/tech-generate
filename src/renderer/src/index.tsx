import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Toaster } from './shared/ui'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster richColors />
  </StrictMode>
)
