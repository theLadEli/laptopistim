import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from "./AuthContext";
import { PostHogProvider } from 'posthog-js/react';

const options = {
  api_host: "https://eu.i.posthog.com",
  debug: import.meta.env.MODE === "development"
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <PostHogProvider 
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <App />
    </PostHogProvider>
  </AuthProvider>
);