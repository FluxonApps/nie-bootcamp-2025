import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import { AuthProvider } from './context/AuthContext';


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
      <AuthProvider> {/* Wrap your App */}
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
