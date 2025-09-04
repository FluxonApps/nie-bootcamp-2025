// src/components/AddProduct.tsx
import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";


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

interface Features {
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  vitamins?: string[];
  minerals?: string[];
  otherBenefits?: string[];
}

const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [aliases, setAliases] = useState<string[]>([]);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [useCases, setUseCases] = useState<string[]>([]);
  const [verdict, setVerdict] = useState("Unknown");

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", adulterants: [], description: "", type: "", quantity: "" },
  ]);

  const [features, setFeatures] = useState<Features>({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    vitamins: [],
    minerals: [],
    otherBenefits: [],
  });

  const [message, setMessage] = useState("");

  const parseCSVToArray = (input: string): string[] =>
    input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  // Handlers for updating ingredients
  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", adulterants: [], description: "", type: "", quantity: "" },
    ]);
  };

  // Handlers for features comma-separated input to arrays
  const handleFeaturesArrayChange = (
    field: keyof Features,
    value: string
  ) => {
    setFeatures({
      ...features,
      [field]: parseCSVToArray(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const product = {
        name,
        aliases,
        brand,
        description,
        category,
        useCases,
        verdict,
        ingredients,
        features,
      };

    //   const response = await axios.post("/api/products", product);
      const response = await axios.post("http://localhost:8004/api/products", product);

      if (response.data.success) {
        setMessage("Product added successfully");
        // Reset all fields
        setName("");
        setAliases([]);
        setBrand("");
        setDescription("");
        setCategory("");
        setUseCases([]);
        setVerdict("Unknown");
        setIngredients([
          { name: "", adulterants: [], description: "", type: "", quantity: "" },
        ]);
        setFeatures({
          calories: "",
          protein: "",
          carbs: "",
          fat: "",
          vitamins: [],
          minerals: [],
          otherBenefits: [],
        });
      } else {
        setMessage("Failed to add product");
      }
    } catch (error: any) {
      setMessage(
        `Error: ${error.response?.data?.message || error.message || "Unknown"}`
      );
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Name*
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Aliases (comma separated)
          <input
            type="text"
            value={aliases.join(", ")}
            onChange={(e) => setAliases(parseCSVToArray(e.target.value))}
          />
        </label>

        <label>
          Brand
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Category
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>

        <label>
          Use Cases (comma separated)
          <input
            type="text"
            value={useCases.join(", ")}
            onChange={(e) => setUseCases(parseCSVToArray(e.target.value))}
          />
        </label>

        <label>
          Verdict
          <input
            type="text"
            value={verdict}
            onChange={(e) => setVerdict(e.target.value)}
          />
        </label>

        <fieldset>
          <legend>Ingredients</legend>
          {ingredients.map((ingredient, idx) => (
            <div key={idx} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
              <label>
                Name*
                <input
                  type="text"
                  required
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(idx, "name", e.target.value)
                  }
                />
              </label>
              <label>
                Quantity
                <input
                  type="text"
                  value={ingredient.quantity || ""}
                  onChange={(e) =>
                    handleIngredientChange(idx, "quantity", e.target.value)
                  }
                />
              </label>
              <label>
                Type
                <input
                  type="text"
                  value={ingredient.type || ""}
                  onChange={(e) =>
                    handleIngredientChange(idx, "type", e.target.value)
                  }
                />
              </label>
              <label>
                Description
                <input
                  type="text"
                  value={ingredient.description || ""}
                  onChange={(e) =>
                    handleIngredientChange(idx, "description", e.target.value)
                  }
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </fieldset>

        <fieldset>
          <legend>Features</legend>

          <label>
            Calories
            <input
              type="text"
              value={features.calories || ""}
              onChange={(e) =>
                setFeatures({ ...features, calories: e.target.value })
              }
            />
          </label>

          <label>
            Protein
            <input
              type="text"
              value={features.protein || ""}
              onChange={(e) =>
                setFeatures({ ...features, protein: e.target.value })
              }
            />
          </label>

          <label>
            Carbs
            <input
              type="text"
              value={features.carbs || ""}
              onChange={(e) =>
                setFeatures({ ...features, carbs: e.target.value })
              }
            />
          </label>

          <label>
            Fat
            <input
              type="text"
              value={features.fat || ""}
              onChange={(e) => setFeatures({ ...features, fat: e.target.value })}
            />
          </label>

          <label>
            Vitamins (comma separated)
            <input
              type="text"
              value={features.vitamins?.join(", ") || ""}
              onChange={(e) => handleFeaturesArrayChange("vitamins", e.target.value)}
            />
          </label>

          <label>
            Minerals (comma separated)
            <input
              type="text"
              value={features.minerals?.join(", ") || ""}
              onChange={(e) => handleFeaturesArrayChange("minerals", e.target.value)}
            />
          </label>

          <label>
            Other Benefits (comma separated)
            <input
              type="text"
              value={features.otherBenefits?.join(", ") || ""}
              onChange={(e) => handleFeaturesArrayChange("otherBenefits", e.target.value)}
            />
          </label>
        </fieldset>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
