import React, { useState } from "react";

interface Adulterant {
  name: string;
  healthImpact: string;
}

interface Ingredient {
  name: string;
  description?: string;
  type?: string;
  adulterants?: Adulterant[];
  quantity?: string;
}

interface IngredientListProps {
  ingredients?: Ingredient[];
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!ingredients || ingredients.length === 0) return null;

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Ingredients</h2>
      {ingredients.map((ing, i) => (
        <div key={i} className="border rounded-lg overflow-hidden">
          <button
            className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
            onClick={() => toggleIndex(i)}
          >
            <span className="font-medium">{ing.name}</span>
            <span>{openIndex === i ? "-" : "+"}</span>
          </button>
          {openIndex === i && (
            <div className="p-4 bg-gray-50 space-y-2">
              {ing.quantity && <p><strong>Quantity:</strong> {ing.quantity}</p>}
              {ing.type && <p><strong>Type:</strong> {ing.type}</p>}
              {ing.description && <p><strong>Description:</strong> {ing.description}</p>}
              {ing.adulterants && ing.adulterants.length > 0 && (
                <div>
                  <p className="font-semibold">Adulterants:</p>
                  <ul className="ml-4 list-disc">
                    {ing.adulterants.map((a, j) => (
                      <li key={j}>{a.name} - {a.healthImpact}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default IngredientList;
