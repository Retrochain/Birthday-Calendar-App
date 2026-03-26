// This is the entry point of the React application. It imports necessary modules and renders the App component into the DOM.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create a root element and render the App component wrapped in StrictMode for highlighting potential problems in the application.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
