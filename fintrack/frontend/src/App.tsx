import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FormPage from "./pages/TransactionForm";
import ReportPage from "./pages/ReportPage";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/reports" element={<ReportPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;