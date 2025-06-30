import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Fixed casing for consistency

// Import fonts directly in the main entry point
import '@fontsource/poppins'; // Default weight 400
import '@fontsource/poppins/400.css'; // Specify weight
import '@fontsource/poppins/700.css'; // Bold weight
import '@fontsource/space-grotesk'; // Default weight 400
import '@fontsource/space-grotesk/400.css'; // Specific weight
import '@fontsource/space-grotesk/300.css'; // Light weight
import '@fontsource/space-grotesk/500.css'; // Medium weight

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);