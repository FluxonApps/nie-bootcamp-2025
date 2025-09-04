import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8004/api/products/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
          setVerdict(response.data.data.verdict || "");
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDecision = async (approve: boolean) => {
    if (!product) return;
    try {
      const response = await axios.patch(`http://localhost:8004/api/products/${product._id}/approve`, {
        verdict,
        isApproved: approve,
      });
      if (response.data.success) {
        alert(`Product ${approve ? "Approved" : "Rejected"}!`);
        setProduct(response.data.data);
      } else {
        alert("Failed to update product review");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Error while reviewing product");
    }
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
