import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "sonner";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
  
      <Toaster
        theme="dark" // Forces dark mode globally
        richColors // Automatically paints green for success and red for error
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid #333",
          },
          className: "my-global-toast-class",
        }}
      />
 

    <App />
  </StrictMode>,
);
