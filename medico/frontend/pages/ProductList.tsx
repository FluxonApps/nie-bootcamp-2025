import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  verdict: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8004/api/products")
      .then((res) => res.json())
      .then((data) => {
        // backend response has { success: true, data: [...] }
        if (data.success) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map((p) => (
        <div key={p._id}>
          <h2>{p.name}</h2>
          <p>{p.description}</p>
          <p><strong>Brand:</strong> {p.brand}</p>
          <p><strong>Verdict:</strong> {p.verdict}</p>
        </div>
      ))}
    </div>
  );
}
