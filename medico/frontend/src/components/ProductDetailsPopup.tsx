import React from 'react';
import type { Product } from '../types/product';

interface ProductDetailsPopupProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailsPopup: React.FC<ProductDetailsPopupProps> = ({ product, onClose }) => {
  const {
    name,
    aliases,
    brand,
    description,
    category,
    ingredients,
    useCases,
    features,
    isApproved,
    verdict,
  } = product;

  // Helper to render lists if present
  const renderList = (title: string, items?: string[]) => (
    items && items.length > 0 && (
      <>
        <h4>{title}</h4>
        <ul>
          {items.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </>
    )
  );

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}>
      <div style={{
        background: 'white', padding: '24px', borderRadius: '8px',
        maxHeight: '80vh', overflowY: 'auto', width: '600px',
      }}>
        <button onClick={onClose} style={{ float: 'right' }}>Close</button>
        <h1>{name}</h1>
        {aliases && aliases.length > 0 && <p><strong>Aliases:</strong> {aliases.join(', ')}</p>}
        {brand && <p><strong>Brand:</strong> {brand}</p>}
        {description && <p><strong>Description:</strong> {description}</p>}
        {category && <p><strong>Category:</strong> {category}</p>}

        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((ing, idx) => (
            <li key={idx}>
              <strong>{ing.name}</strong>
              {ing.description && <p>Description: {ing.description}</p>}
              {ing.type && <p>Type: {ing.type}</p>}
              {ing.quantity && <p>Quantity: {ing.quantity}</p>}
              {ing.adulterants && ing.adulterants.length > 0 && (
                <>
                  <p>Adulterants:</p>
                  <ul>
                    {ing.adulterants.map((adulterant, i) => (
                      <li key={i}>
                        {adulterant.name} {adulterant.healthImpact && `- Health Impact: ${adulterant.healthImpact}`}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>

        {renderList('Use Cases', useCases)}
        
        {features && (
          <>
            <h3>Features</h3>
            {features.calories && <p>Calories: {features.calories}</p>}
            {features.protein && <p>Protein: {features.protein}</p>}
            {features.carbs && <p>Carbs: {features.carbs}</p>}
            {features.fat && <p>Fat: {features.fat}</p>}
            {renderList('Vitamins', features.vitamins)}
            {renderList('Minerals', features.minerals)}
            {renderList('Other Benefits', features.otherBenefits)}
          </>
        )}

        {isApproved !== undefined && (
          <p><strong>Approved:</strong> {isApproved ? 'Yes' : 'No'}</p>
        )}
        {verdict && <p><strong>Verdict:</strong> {verdict}</p>}
      </div>
    </div>
  );
};

export default ProductDetailsPopup;
