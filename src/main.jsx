import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskProvider from './components/context/TaskProvider.jsx'
import ModalProvider from './components/context/ModalProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </TaskProvider>
  </StrictMode>,
)
