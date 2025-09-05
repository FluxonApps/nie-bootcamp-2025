import React from "react";
import "./App.css";

// 👈 Import routing components and your pages
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import ReviewPage from "../pages/ReviewPage";
import Signuppage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import FavoritesPage from "../pages/FavoritesPage";
import Navbar from "../components/Navbar";

// 👈 Import your ProductList component
import ProductList from "../Pages/ProductList";

function App() {
  return (
    <div className="App">
      <Navbar />

      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/approve-products" element={<ReviewPage />} /> {/* alias */}
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          
          {/* 👇 New route for product list */}
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </main>

      <footer className="p-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Medico. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
