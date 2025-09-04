import React from "react";

interface ProductFeaturesProps {
  features?: Record<string, string>;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  if (!features) return null;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border mt-6">
      <h2 className="text-xl font-semibold mb-4">Features</h2>
      <ul className="grid grid-cols-2 gap-4">
        {Object.entries(features).map(([key, value], i) => (
          <li key={i} className="flex justify-between text-gray-700">
            <span className="font-medium">{key}:</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFeatures;
