
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add a class to make sure dark mode is applied immediately
document.documentElement.classList.add('dark');

createRoot(document.getElementById("root")!).render(<App />);
