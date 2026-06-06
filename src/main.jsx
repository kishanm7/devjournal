import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { GamificationProvider } from './context/GamificationContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GamificationProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </GamificationProvider>
  </StrictMode>
);
