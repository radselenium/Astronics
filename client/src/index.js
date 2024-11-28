import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from './msalConfig'; // Ensure this file contains your MSAL configuration


// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Export msalInstance for use in other files
export { msalInstance };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MsalProvider instance={msalInstance}>
    <App />
    </MsalProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
