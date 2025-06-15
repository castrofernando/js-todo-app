import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { SnackbarProvider } from 'notistack'
import App from './app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider autoHideDuration={1000} 
    maxSnack={3} 
    TransitionProps={{ direction: 'left' }} 
    anchorOrigin={{ vertical: 'top', horizontal: 'right' } }>
      <App />
    </SnackbarProvider>
  </StrictMode>,
)
