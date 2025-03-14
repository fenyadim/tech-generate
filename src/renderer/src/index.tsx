import './app/styles/globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Toaster } from './shared/ui'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
)
