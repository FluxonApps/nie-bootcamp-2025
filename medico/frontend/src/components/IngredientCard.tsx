import React from "react";

interface Adulterant {
  name: string;
  healthImpact: string;
}

interface Ingredient {
  name: string;
  description?: string;
  type?: string;
  quantity?: string;
  adulterants?: Adulterant[];
}

const IngredientCard: React.FC<{ ingredient: Ingredient }> = ({ ingredient }) => {
  return (
    <div className="p-4 border rounded-xl bg-gray-50">
      <h3 className="font-semibold text-lg">{ingredient.name}</h3>
      {ingredient.quantity && <p className="text-sm">Quantity: {ingredient.quantity}</p>}
      {ingredient.type && <p className="text-sm">Type: {ingredient.type}</p>}
      {ingredient.description && <p className="text-sm text-gray-600">{ingredient.description}</p>}
      {ingredient.adulterants && ingredient.adulterants.length > 0 && (
        <ul className="list-disc ml-6 text-sm text-red-500">
          {ingredient.adulterants.map((ad, i) => (
            <li key={i}>{ad.name} — {ad.healthImpact}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientCard;
