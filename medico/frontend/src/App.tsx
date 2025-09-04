

import "./App.css";



import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage"; 
import SearchPage from "./pages/SearchPage"; 
import Navbar from "./components/Navbar";     
import ProductDetail from "./pages/productDetails";
// import ReviewProduct from "./pages/reviewPage1";
import AddProductPage from "./pages/AddProduct";
import UnApprovedPage from "./pages/unApprovedPage";
import RecommendPage from "./pages/RecommendedPage";
import HomePage from "./pages/homePage"; 
import SearchPage from "./pages/SearchPage"; 
import Navbar from "./components/Navbar";     
import ProductDetail from "./pages/productDetails";
// import ReviewProduct from "./pages/reviewPage1";
import AddProductPage from "./pages/AddProduct";
import UnApprovedPage from "./pages/unApprovedPage";
import RecommendPage from "./pages/RecommendedPage";
function App() {
  return (
    <div className="App">
      <Navbar />

      <main className="p-4">
        <Routes>
          <Route path="/recommended/:name" element={<RecommendPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/recommended/:name" element={<RecommendPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/product/unapproved/:id" element={<ReviewProduct />}/> */}
          <Route path="/unapproved-products" element={<UnApprovedPage />} />
          {/* <Route path="/product/unapproved/:id" element={<ReviewProduct />}/> */}
          <Route path="/unapproved-products" element={<UnApprovedPage />} />
        </Routes>
      </main>

      <footer className="p-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Medico. All rights reserved.
      </footer>
    </div>
  );
}

export default App;