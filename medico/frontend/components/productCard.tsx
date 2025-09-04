// 👈 1. Import useState
import React, { useState } from "react";
import "./productCard.css";

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
  // 👈 2. Add state to track if the card is flipped
  const [isFlipped, setIsFlipped] = useState(false);

  // 👈 3. Create a function to handle the click event
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    // 👈 4. Add the onClick handler to the main card container
    <div className="flip-card" onClick={handleFlip}>
      {/* 👈 5. Conditionally apply the 'flipped' class based on state */}
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* -------- FRONT -------- */}
        <div className="flip-card-front">
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
            <div className="status-section">
              {product.isApproved !== undefined && (
                <p className={product.isApproved ? "approved" : "not-approved"}>
                  {product.isApproved ? "✅ Verified & Approved" : "❌ Use With Caution"}
                </p>
              )}
              {product.verdict && (
                <p className="verdict">
                  <strong>Verdict:</strong> {product.verdict}
                </p>
              )}
            </div>
          </div>

          {product.ingredients && product.ingredients.length > 0 && (
            <div className="front-ingredients">
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
        </div>

        {/* -------- BACK -------- */}
        <div className="flip-card-back">
          <div className="back-content">
            {product.verdict && (
              <div className="back-section">
                <h3>⚖️ Our Verdict</h3>
                <p className="verdict-details">{product.verdict}</p>
              </div>
            )}
            
            {product.features && (
              <div className="back-section">
                <h3>📊 Nutritional Features</h3>
                <ul>
                  {product.features.calories && (<li><strong>Calories:</strong> {product.features.calories}</li>)}
                  {product.features.protein && (<li><strong>Protein:</strong> {product.features.protein}</li>)}
                  {product.features.carbs && (<li><strong>Carbs:</strong> {product.features.carbs}</li>)}
                  {product.features.fat && (<li><strong>Fat:</strong> {product.features.fat}</li>)}
                  {product.features.vitamins?.length && (<li><strong>Vitamins:</strong> {product.features.vitamins.join(", ")}</li>)}
                  {product.features.minerals?.length && (<li><strong>Minerals:</strong> {product.features.minerals.join(", ")}</li>)}
                  {product.features.otherBenefits?.length && (<li><strong>Other:</strong> {product.features.otherBenefits.join(", ")}</li>)}
                </ul>
              </div>
            )}

            {(product.ingredients?.length ?? 0) > 0 && (
              <div className="back-section">
                <h3>🔬 Full Ingredient List</h3>
                <ul>
                  {product.ingredients?.map((ing, idx) => (
                    <li key={idx} className="ingredient-item">
                      <div className="ingredient-row">
                        <span>{ing.name}</span>
                        {ing.quantity && (<span className="badge">{ing.quantity}</span>)}
                        {ing.type && <span className="tag">{ing.type}</span>}
                      </div>
                      {ing.description && <p className="ing-description">{ing.description}</p>}
                      {ing.adulterants?.length ? (
                        <ul className="adulterants">
                          {ing.adulterants.map((ad, adIdx) => (
                            <li key={adIdx}>
                              ⚠ {ad.name} – {ad.healthImpact}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(product.useCases?.length ?? 0) > 0 && (
              <div className="back-section">
                <h3>💡 Use Cases</h3>
                <ul>
                  {product.useCases?.map((uc, idx) => (
                    <li key={idx}>✔ {uc}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;