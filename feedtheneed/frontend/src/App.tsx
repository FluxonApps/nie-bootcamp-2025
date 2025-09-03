import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserPage from "./pages/User/UserPage";
import AdminPage from "./pages/Admin/AdminPage";

function App() {
  return (
    <Router>
      <div className="p-6">
        <nav className="flex gap-6 mb-6 text-lg font-medium">
          <Link to="/user" className="text-green-600 hover:underline">
            User
          </Link>
          <Link to="/admin" className="text-green-600 hover:underline">
            Admin
          </Link>
        </nav>

        <Routes>
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
