import React, { useState } from 'react';
import type { Product } from '../types/product';
import ProductCard from './ProductCard';
import ProductDetailsPopup from './ProductDetailsPopup';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {products.map((product) => (
          <ProductCard key={product.name} product={product} onShowMore={() => setSelectedProduct(product)} />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailsPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default ProductList;
