// Bootstrap file for web platform
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';

// Initialize the app once the DOM is ready
const mount = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }
  
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Wait for DOM to be ready
if (document.readyState === 'complete') {
  mount();
} else {
  window.addEventListener('load', mount);
} 