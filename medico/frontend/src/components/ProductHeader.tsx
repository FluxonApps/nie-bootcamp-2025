import React from "react";

interface ProductHeaderProps {
  name: string;
  brand?: string;
  description?: string;
  category?: string;
  aliases?: string[];
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  name,
  brand,
  description,
  category,
  aliases,
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold mb-2">{name}</h1>
      {brand && <p className="text-lg mb-1">Brand: {brand}</p>}
      {description && <p className="mb-2 text-gray-700">{description}</p>}
      {category && <p className="mb-1 font-semibold">Category: {category}</p>}
      {aliases && aliases.length > 0 && (
        <p className="text-sm text-gray-500">
          Aliases: {aliases.join(", ")}
        </p>
      )}
    </div>
  );
};

export default ProductHeader;
