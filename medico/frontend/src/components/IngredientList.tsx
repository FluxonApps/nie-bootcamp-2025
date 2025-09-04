import React, { useState } from "react";

interface Ingredient {
  name: string;
  details?: string;
  benefits?: string[];
}

interface IngredientListProps {
  ingredients?: Ingredient[];
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border mt-6">
      <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
      <div className="space-y-3">
        {ingredients.map((ing, index) => (
          <div
            key={index}
            className="p-4 border rounded-xl cursor-pointer hover:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <h3 className="font-semibold text-gray-800">{ing.name}</h3>
            {openIndex === index && (
              <div className="mt-2 text-sm text-gray-600 space-y-2">
                {ing.details && <p>{ing.details}</p>}
                {ing.benefits && ing.benefits.length > 0 && (
                  <ul className="list-disc ml-6">
                    {ing.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
