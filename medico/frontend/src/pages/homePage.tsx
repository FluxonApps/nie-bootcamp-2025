// HomePage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard";

import ProductCard from "../components/productCard";

import "./homePage.css";

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

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8004/api/products");
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedProducts();
  }, []);

  if (loading) return <p className="status-text">Loading approved products...</p>;
  if (error) return <p className="status-text error">{error}</p>;
  if (products.length === 0)
    return <p className="status-text">No approved products available.</p>;

  return (
    <div className="home-page px-6 py-4">
      <h2 className="text-2xl font-bold mb-6">Approved Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>

  );
};

export default HomePage;
