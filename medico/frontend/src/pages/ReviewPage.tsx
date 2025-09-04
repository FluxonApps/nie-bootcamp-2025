import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";  // 👈 import
import "./homePage.css";

type Product = {
  _id: string;
  name: string;
  aliases?: string[];
  brand?: string;
  description?: string;
  category?: string;
  isApproved?: boolean;
  verdict?: string;
};

function normalizeProduct(product: any) {
  return {
    ...product,
    isApproved: product.isApproved ?? product.approved ?? false,
  };
}

const ReviewPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();  // 👈 hook

  useEffect(() => {
    const fetchUnapproved = async () => {
      try {
        const response = await axios.get("http://localhost:8004/api/products/unapproved");
        const data = Array.isArray(response.data.data)
          ? response.data.data.map(normalizeProduct)
          : [];
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load unapproved products.");
      } finally {
        setLoading(false);
      }
    };
    fetchUnapproved();
  }, []);

  if (loading) return <p className="status-text">Loading products for review...</p>;
  if (error) return <p className="status-text error">{error}</p>;
  if (products.length === 0) return <p className="status-text">No products pending review.</p>;

  return (
    <div className="home-page px-6 py-4">
      <h2 className="text-2xl font-bold mb-6">Products Pending Review</h2>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product._id}
            className="review-card cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}  // 👈 redirect
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
