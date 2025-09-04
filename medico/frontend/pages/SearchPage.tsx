// src/pages/SearchPage.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // 👈 Import to read URL query
import axios from "axios";
import ProductCard from "../components/productCard";
import "./SearchPage.css"; // 👈 New CSS file for the search page

// --- Type definitions (copied from HomePage) ---
type Ingredient = {
  name: string;
  description?: string;
  type?: string;
  adulterants?: { name: string; healthImpact: string }[];
  quantity?: string;
};

type Features = {
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  vitamins?: string[];
  minerals?: string[];
  otherBenefits?: string[];
};

type Product = {
  _id: string;
  name: string;
  aliases?: string[];
  brand?: string;
  description?: string;
  category?: string;
  ingredients?: Ingredient[];
  useCases?: string[];
  features?: Features;
  isApproved?: boolean;
  verdict?: string;
};

const SearchPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get search query 'q' from the URL (e.g., /search?q=milk)
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    // Only fetch if there is a search query
    if (!query) {
      setProducts([]); // Clear results if no query
      return;
    }

    const fetchSearchedProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // IMPORTANT: Adjust this URL to match your API's search endpoint
        const response = await axios.get(
          `http://localhost:8004/api/products/search?query=${query}`
        );
        
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchedProducts();
  }, [query]); // 👈 Re-run the effect whenever the 'query' changes

  // Helper function to render content based on state
  const renderContent = () => {
    if (!query) {
      return <p className="status-text">Please enter a term in the search bar to begin.</p>;
    }
    if (loading) {
      return <p className="status-text">Searching for "{query}"...</p>;
    }
    if (error) {
      return <p className="status-text error">{error}</p>;
    }
    if (products.length === 0) {
      return <p className="status-text">No products found for "{query}".</p>;
    }
    return (
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="search-page">
      <h2 className="page-title">
        {query ? `Search Results for "${query}"` : "Search"}
      </h2>
      {renderContent()}
    </div>
  );
};

export default SearchPage;