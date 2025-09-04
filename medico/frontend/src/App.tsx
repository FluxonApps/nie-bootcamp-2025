import React from "react";
import "./App.css";

// 👈 Import routing components and your pages
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import ReviewPage from "../pages/ReviewPage";   // 👈 added
import Navbar from "../components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />

      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/review" element={<ReviewPage />} /> {/* 👈 new route */}
        </Routes>
      </main>

      <footer className="p-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Medico. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
