// ProductCard.tsx
import React from "react";
import "./ProductCard.css"; // Import the CSS

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

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front">
          <div className="card-header">
            <h2>{product.name}</h2>
            {product.brand && <p className="brand">Brand: {product.brand}</p>}
          </div>
          {product.category && (
            <span className="category">{product.category}</span>
          )}
          {product.isApproved && (
            <p className="approved">✅ Approved</p>
          )}
        </div>

        {/* Back */}
        <div className="flip-card-back">
          <div className="back-content">
            {product.description && <p className="description">{product.description}</p>}

            {product.features && (
              <div className="features">
                <h3>Features:</h3>
                <ul>
                  {product.features.calories && <li>Calories: {product.features.calories}</li>}
                  {product.features.protein && <li>Protein: {product.features.protein}</li>}
                  {product.features.carbs && <li>Carbs: {product.features.carbs}</li>}
                  {product.features.fat && <li>Fat: {product.features.fat}</li>}
                  {product.features.vitamins && product.features.vitamins.length > 0 && (
                    <li>Vitamins: {product.features.vitamins.join(", ")}</li>
                  )}
                  {product.features.minerals && product.features.minerals.length > 0 && (
                    <li>Minerals: {product.features.minerals.join(", ")}</li>
                  )}
                  {product.features.otherBenefits && product.features.otherBenefits.length > 0 && (
                    <li>Other: {product.features.otherBenefits.join(", ")}</li>
                  )}
                </ul>
              </div>
            )}

            {product.ingredients && product.ingredients.length > 0 && (
              <div className="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                  {product.ingredients.map((ing, idx) => (
                    <li key={idx}>
                      <span className="ingredient-name">{ing.name}</span>
                      {ing.quantity && ` (${ing.quantity})`}
                      {ing.type && ` - ${ing.type}`}
                      {ing.adulterants && ing.adulterants.length > 0 && (
                        <ul className="adulterants">
                          {ing.adulterants.map((ad, adIdx) => (
                            <li key={adIdx}>{ad.name} - {ad.healthImpact}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.useCases && product.useCases.length > 0 && (
              <div className="use-cases">
                <h3>Use Cases:</h3>
                <p>{product.useCases.join(", ")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
