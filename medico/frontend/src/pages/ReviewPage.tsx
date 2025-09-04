import React, { useEffect, useState } from "react";

import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";  // 👈 import
import "./homePage.css";

type Product = {
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import ProductHeader from "../components/ProductHeader";
import ProductFeatures from "../components/ProductFeatures";
import IngredientList from "../components/IngredientList";

interface Product {

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
  ingredients?: any[];
  useCases?: string[];
  features?: any;
  isApproved: boolean;
  verdict: string;
}

const ReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [verdict, setVerdict] = useState("");
  const [loading, setLoading] = useState(true);

  // will replace with actual API call later
  useEffect(() => {
    setTimeout(() => {
      const dummy: Product = {
        _id: "1",
        name: "Organic Protein Powder",
        brand: "FitLife",
        description: "A plant-based protein powder with essential nutrients.",
        category: "Supplements",
        aliases: ["Plant Protein", "Vegan Protein"],
        features: {
          Calories: "120",
          Protein: "25g",
          Carbs: "5g",
          Fat: "2g",
          Vitamins: "B12, D3",
        },
        ingredients: [
          {
            name: "Brown Rice Protein",
            details: "Rich in amino acids, easily digestible.",
            benefits: ["Supports muscle growth", "Easily digestible"],
          },
          {
            name: "Pea Protein",
            details: "High-quality plant protein source.",
            benefits: ["Promotes satiety", "Rich in iron"],
          },
        ],
        useCases: ["Post-workout recovery", "Meal replacement"],
        isApproved: false,
        verdict: "",
      };
      setProduct(dummy);
      setVerdict(dummy.verdict || "");
      setLoading(false);
    }, 800);
  }, [id]);

  const handleDecision = async (approve: boolean) => {
    if (!product) return;
    alert(`Product ${approve ? "Approved" : "Rejected"}!`);
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!product) return <p className="text-center mt-10 text-gray-600">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <ProductHeader {...product} />
      </div>

      <ProductFeatures features={product.features} />
      <IngredientList ingredients={product.ingredients} />

      {product.useCases && product.useCases.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Use Cases</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            {product.useCases.map((uc, i) => (
              <li key={i} className="text-gray-600">{uc}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Review Decision</h2>
        <textarea
          value={verdict}
          onChange={(e) => setVerdict(e.target.value)}
          placeholder="Write your verdict..."
          className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
        />
        <div className="flex gap-4 justify-end">
          <Button 
            onClick={() => handleDecision(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
          >
            Approve
          </Button>
          <Button 
            onClick={() => handleDecision(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
          >
            Reject
          </Button>
        </div>

      </div>
    </div>
  );
};


export default ReviewPage;
