import React, { useState } from "react";

const AddProductPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        aliases: "",
        brand: "",
        description: "",
        category: "",
        useCases: "",
        features: {
            calories: "",
            protein: "",
            carbs: "",
            fat: "",
            vitamins: "",
            minerals: "",
            otherBenefits: "",
        },
        ingredients: [
            {
                name: "",
                description: "",
                type: "",
                quantity: "",
                adulterants: [{ name: "", healthImpact: "" }],
            },
        ],
    });

    // ---------- handlers ----------
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name in formData.features) {
            setFormData({
                ...formData,
                features: { ...formData.features, [name]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleIngredientChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index][name as keyof typeof updatedIngredients[number]] =
            value as any;
        setFormData({ ...formData, ingredients: updatedIngredients });
    };

    const handleAdulterantChange = (
        ingIndex: number,
        adIndex: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const updatedIngredients = [...formData.ingredients];

        const adulterant = updatedIngredients[ingIndex].adulterants[adIndex];
        (adulterant as any)[name as keyof typeof adulterant] = value;

        setFormData({ ...formData, ingredients: updatedIngredients });
    };

    const addIngredient = () => {
        setFormData({
            ...formData,
            ingredients: [
                ...formData.ingredients,
                {
                    name: "",
                    description: "",
                    type: "",
                    quantity: "",
                    adulterants: [{ name: "", healthImpact: "" }],
                },
            ],
        });
    };

    const addAdulterant = (ingIndex: number) => {
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[ingIndex].adulterants.push({
            name: "",
            healthImpact: "",
        });
        setFormData({ ...formData, ingredients: updatedIngredients });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            aliases: formData.aliases.split(",").map((a) => a.trim()),
            useCases: formData.useCases.split(",").map((u) => u.trim()),
            features: {
                ...formData.features,
                vitamins: formData.features.vitamins
                    .split(",")
                    .map((v) => v.trim()),
                minerals: formData.features.minerals
                    .split(",")
                    .map((m) => m.trim()),
                otherBenefits: formData.features.otherBenefits
                    .split(",")
                    .map((o) => o.trim()),
            },
        };

        console.log("Final Payload:", payload);
    };

    // ---------- utility classes ----------
    const inputClass =
        "w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-gray-700 " +
        "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 " +
        "shadow-sm transition";
    const textAreaClass =
        "w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-gray-700 " +
        "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 " +
        "shadow-sm transition";
    const btnPrimary =
        "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl " +
        "shadow-md transition w-full";
    const btnSecondary =
        "text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition";

    // ---------- component ----------
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 flex items-center justify-center p-8">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-10 space-y-10 border border-gray-200"
            >
                <h2 className="text-4xl font-extrabold text-center text-indigo-700">
                    Add New Product
                </h2>

                {/* Basic Product Info */}
                <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                        Product Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Product Name *"
                            required
                            className={inputClass}
                        />
                        <input
                            name="aliases"
                            value={formData.aliases}
                            onChange={handleChange}
                            placeholder="Aliases (comma separated)"
                            className={inputClass}
                        />
                        <input
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Brand"
                            className={inputClass}
                        />
                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Category"
                            className={inputClass}
                        />
                    </div>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows={3}
                        className={textAreaClass}
                    />
                    <input
                        name="useCases"
                        value={formData.useCases}
                        onChange={handleChange}
                        placeholder="Use Cases (comma separated)"
                        className={inputClass}
                    />
                </section>

                {/* Ingredients */}
                <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                        🧪 Ingredients
                    </h3>
                    {formData.ingredients.map((ingredient, ingIndex) => (
                        <div
                            key={ingIndex}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4 shadow-md"
                        >
                            <input
                                name="name"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(ingIndex, e)}
                                placeholder="Ingredient Name"
                                className={inputClass}
                            />
                            <textarea
                                name="description"
                                value={ingredient.description}
                                onChange={(e) => handleIngredientChange(ingIndex, e)}
                                placeholder="Ingredient Description"
                                rows={2}
                                className={textAreaClass}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    name="type"
                                    value={ingredient.type}
                                    onChange={(e) => handleIngredientChange(ingIndex, e)}
                                    placeholder="Type (Active / Inactive)"
                                    className={inputClass}
                                />
                                <input
                                    name="quantity"
                                    value={ingredient.quantity}
                                    onChange={(e) => handleIngredientChange(ingIndex, e)}
                                    placeholder="Quantity"
                                    className={inputClass}
                                />
                            </div>

                            {/* Adulterants */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-3">
                                    ⚠ Adulterants
                                </h4>
                                {ingredient.adulterants.map((ad, adIndex) => (
                                    <div
                                        key={adIndex}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2"
                                    >
                                        <input
                                            name="name"
                                            value={ad.name}
                                            onChange={(e) =>
                                                handleAdulterantChange(ingIndex, adIndex, e)
                                            }
                                            placeholder="Adulterant Name"
                                            className={inputClass}
                                        />
                                        <input
                                            name="healthImpact"
                                            value={ad.healthImpact}
                                            onChange={(e) =>
                                                handleAdulterantChange(ingIndex, adIndex, e)
                                            }
                                            placeholder="Health Impact"
                                            className={inputClass}
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addAdulterant(ingIndex)}
                                    className={btnSecondary}
                                >
                                    + Add Adulterant
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addIngredient}
                        className={btnSecondary}
                    >
                        + Add Ingredient
                    </button>
                </section>

                {/* Features */}
                <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                        🍏 Features
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <input
                            name="calories"
                            value={formData.features.calories}
                            onChange={handleChange}
                            placeholder="Calories"
                            className={inputClass}
                        />
                        <input
                            name="protein"
                            value={formData.features.protein}
                            onChange={handleChange}
                            placeholder="Protein"
                            className={inputClass}
                        />
                        <input
                            name="carbs"
                            value={formData.features.carbs}
                            onChange={handleChange}
                            placeholder="Carbs"
                            className={inputClass}
                        />
                        <input
                            name="fat"
                            value={formData.features.fat}
                            onChange={handleChange}
                            placeholder="Fat"
                            className={inputClass}
                        />
                    </div>
                    <input
                        name="vitamins"
                        value={formData.features.vitamins}
                        onChange={handleChange}
                        placeholder="Vitamins (comma separated)"
                        className={inputClass}
                    />
                    <input
                        name="minerals"
                        value={formData.features.minerals}
                        onChange={handleChange}
                        placeholder="Minerals (comma separated)"
                        className={inputClass}
                    />
                    <input
                        name="otherBenefits"
                        value={formData.features.otherBenefits}
                        onChange={handleChange}
                        placeholder="Other Benefits (comma separated)"
                        className={inputClass}
                    />
                </section>

                {/* Submit */}
                <button type="submit" className={btnPrimary}>
                    🚀 Submit Product
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
