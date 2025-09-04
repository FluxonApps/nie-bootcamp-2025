// import { useEffect, useState } from "react";

interface Ingredient {
  name: string;
  healthImpact?: string;
}

interface Product {
  _id: string;
  name: string;
  brand?: string;
  description?: string;
  category?: string;
  ingredients: Ingredient[];
  verdict?: string;
  approved?: boolean; // matches backend (default false)
}

export default function ReviewPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch unapproved products
  const fetchUnapproved = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products/unapproved");
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
      }
    } catch (err) {
      console.error("Error fetching unapproved products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnapproved();
  }, []);

  // ✅ Approve product
  const approveProduct = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}/approve`, {
        method: "PUT",
      });
      const json = await res.json();
      if (json.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Error approving product", err);
    }
  };

  // ✅ Delete product
  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8004/api/products/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  if (loading) return <p className="p-4">Loading unapproved products...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Unapproved Products</h1>

      {products.length === 0 ? (
        <p>No unapproved products found ✅</p>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              {product.brand && (
                <p className="text-sm text-gray-500">by {product.brand}</p>
              )}
              {product.description && (
                <p className="mt-2 text-gray-700">{product.description}</p>
              )}

              {product.ingredients?.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-medium">Ingredients:</h3>
                  <ul className="list-disc ml-6">
                    {product.ingredients.map((ing, idx) => (
                      <li key={idx}>
                        {ing.name}{" "}
                        {ing.healthImpact && (
                          <span className="text-xs text-red-500">
                            – {ing.healthImpact}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-3 text-sm text-gray-600">
                Verdict: {product.verdict || "Pending Review"}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => approveProduct(product._id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
