// 👈 1. Import useNavigate instead of useState
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

// --- Type Definitions (No Changes) ---
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

interface Props {
  product: Product;
}

// --- Component ---
const ProductCard: React.FC<Props> = ({ product }) => {
  // 👈 2. Initialize the navigate function
  const navigate = useNavigate();

  // 👈 3. Create a function to handle navigation
  const handleNavigate = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    // 👈 4. Use a simpler class name and the navigation handler
    <div className="product-card" onClick={handleNavigate}>
      {/* -------- Card Content (Previously the "Front") -------- */}

      {product.ingredients && product.ingredients.length > 0 && (
        <div className="front-ingredients">
          <div className="status-section">
            {product.isApproved !== undefined && (
              <p className={product.isApproved ? "approved" : "not-approved"}>
                {product.isApproved
                  ? "✅ Verified & Approved"
                  : "❌ Use With Caution"}
              </p>
            )}
            {product.verdict && (
              <p className="verdict">
                <strong>Verdict:</strong> {product.verdict}
              </p>
            )}
          </div>
          <h3>Key Ingredients ✨</h3>
          <ul>
            {product.ingredients.slice(0, 5).map((ing, idx) => (
              <li key={idx}>{ing.name}</li>
            ))}
            {product.ingredients.length > 5 && (
              <li>+ {product.ingredients.length - 5} more...</li>
            )}
          </ul>
        </div>
      )}
      {/* 👈 5. The entire "BACK" side has been removed. */}
      <div className="card-header">
        {product.category && (
          <span className="category">{product.category}</span>
        )}
        <h2 className="product-title">{product.name}</h2>
        {product.brand && <p className="brand">by {product.brand}</p>}
        {product.aliases && product.aliases.length > 0 && (
          <p className="aliases">
            (Also known as: {product.aliases.join(", ")})
          </p>
        )}
        {product.description && (
          <p className="front-description">{product.description}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;