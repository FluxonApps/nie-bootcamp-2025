import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FormPage from "./pages/FormPage";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white"> {/* Dark theme wrapper */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;