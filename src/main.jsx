import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CredentialsProvider } from './context/CrendentialsContext.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './i18n.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CredentialsProvider>
          <ToastContainer/>
          <App />
      </CredentialsProvider>
    </ThemeProvider>
  </StrictMode>,
)
