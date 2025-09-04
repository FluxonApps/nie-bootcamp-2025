import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTransactionView from "./pages/AddTransactionView"; // ✅ renamed import

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white"> {/* Dark theme wrapper */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-transaction" element={<AddTransactionView />} /> {/* ✅ better route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
