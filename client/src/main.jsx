import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from "react-hot-toast";
import { TaskProvider } from './context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <TaskProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <App />
    </TaskProvider>
  </AuthProvider>,
)
