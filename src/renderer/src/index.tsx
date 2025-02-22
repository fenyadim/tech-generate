import './app/styles/globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UpdateModal } from './components/update-modal'
import { Toaster } from './shared/ui'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster />
    <UpdateModal />
  </React.StrictMode>
)
