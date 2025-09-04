import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Onboarding } from "./pages/onboarding";
import Dashboard from "./pages/Dashboard";  // <-- use their Dashboard
import FormPage from "./pages/FormPage";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white"> {/* Dark theme wrapper */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
