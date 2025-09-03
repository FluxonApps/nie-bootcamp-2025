import React from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onShowMore: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onShowMore }) => {
  const ingredientsToShow = product.ingredients.slice(0, 5);

  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', width: '250px' }}>
      <h2>{product.name}</h2>
      <ul>
        {ingredientsToShow.map((ingredient, index) => (
          <li key={index}>{ingredient.name}</li>
        ))}
      </ul>
      {product.ingredients.length > 5 && (
        <button onClick={onShowMore}>Show More</button>
      )}
    </div>
  );
};

export default ProductCard;
