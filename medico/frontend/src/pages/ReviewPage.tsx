import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { API_BASE_URL } from "../config";

interface Ingredient {
  name: string;
  description?: string;
  type?: string;
  adulterants?: { name: string; healthImpact: string }[];
  quantity?: string;
}

interface Concern {
  type?: string;
  description?: string;
  severity?: string;
}

interface Features {
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  vitamins?: string[];
  minerals?: string[];
  otherBenefits?: string[];
}

interface AiSuggestion {
  reviewer?: string;
  riskScore?: number;
}

interface Product {
  _id: string;
  name: string;
  aliases?: string[];
  brand?: string;
  description?: string;
  category?: string;
  ingredients?: Ingredient[];
  concernSchemas?: Concern[];
  useCases?: string[];
  features?: Features;
  aiSuggestion?: AiSuggestion;
  aiDescription?: string;
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
          const response = await axios.get(`${API_BASE_URL}/products/${id}`);             if (response.data.success) {
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
      const response = await axios.patch(
        `${API_BASE_URL}products/${product._id}/approve`,
        { verdict, isApproved: approve }
      );
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
      {/* Product Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        {product.brand && <p className="text-gray-600">Brand: {product.brand}</p>}
        {product.category && <p className="text-gray-600">Category: {product.category}</p>}
        {product.description && <p className="mt-2 text-gray-700">{product.description}</p>}
        {product.aliases && product.aliases.length > 0 && (
          <p className="text-gray-500 mt-1">Also known as: {product.aliases.join(", ")}</p>
        )}
      </div>

      {/* Ingredients */}
      {product.ingredients && product.ingredients.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {product.ingredients.map((ing, i) => (
              <li key={i} className="border p-3 rounded-lg bg-gray-50">
                <strong>{ing.name}</strong> {ing.quantity && `- ${ing.quantity}`}
                {ing.description && <p className="text-sm text-gray-600">{ing.description}</p>}
                {ing.adulterants && ing.adulterants.length > 0 && (
                  <ul className="list-disc ml-5 text-sm text-red-600 mt-2">
                    {ing.adulterants.map((ad, j) => (
                      <li key={j}>
                        {ad.name} - {ad.healthImpact}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Concerns */}
      {product.concernSchemas && product.concernSchemas.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Concerns</h2>
          <ul className="space-y-2">
            {product.concernSchemas.map((c, i) => (
              <li key={i} className="border p-3 rounded-lg">
                <p><strong>Type:</strong> {c.type}</p>
                <p><strong>Description:</strong> {c.description}</p>
                <p><strong>Severity:</strong> {c.severity}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Features */}
      {product.features && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="grid grid-cols-2 gap-4 text-gray-700">
            {product.features.calories && <li>Calories: {product.features.calories}</li>}
            {product.features.protein && <li>Protein: {product.features.protein}</li>}
            {product.features.carbs && <li>Carbs: {product.features.carbs}</li>}
            {product.features.fat && <li>Fat: {product.features.fat}</li>}
          </ul>
          {product.features.vitamins && product.features.vitamins.length > 0 && (
            <p className="mt-2">Vitamins: {product.features.vitamins.join(", ")}</p>
          )}
          {product.features.minerals && product.features.minerals.length > 0 && (
            <p className="mt-2">Minerals: {product.features.minerals.join(", ")}</p>
          )}
          {product.features.otherBenefits && product.features.otherBenefits.length > 0 && (
            <p className="mt-2">Other Benefits: {product.features.otherBenefits.join(", ")}</p>
          )}
        </div>
      )}

    


    {(product.aiDescription || product.aiSuggestion) && (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">AI Insights</h2>

        {product.aiDescription && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Summary of the Product</h3>
            <p className="mt-2 text-gray-700">{product.aiDescription}</p>
          </div>
        )}

        {product.aiSuggestion && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Suggestion from AI</h3>
            {product.aiSuggestion.reviewer && (
              <p className="text-gray-700 mt-1">Reviewer: {product.aiSuggestion.reviewer}</p>
            )}
            {typeof product.aiSuggestion.riskScore === "number" && (
              <p className="text-gray-700 mt-1">Risk Score: {product.aiSuggestion.riskScore}/100</p>
            )}
          </div>
        )}
      </div>
    )}



   
      {product.useCases && product.useCases.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            {product.useCases.map((uc, i) => (
              <li key={i}>{uc}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Review Section (only if not approved) */}
      {!product.isApproved ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Review Decision</h2>
          <textarea
            value={verdict}
            onChange={(e) => setVerdict(e.target.value)}
            placeholder="Write your verdict..."
            className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800">Verdict</h2>
          <p className="mt-2 text-gray-700">{product.verdict || "No verdict provided."}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
