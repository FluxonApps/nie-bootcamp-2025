import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard"; 
type Ingredient = {
  name: string;
  description?: string;
  type?: string;
  adulterants?: { name: string; healthImpact: string }[];
  quantity?: string;
};

type Features = {
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  vitamins?: string[];
  minerals?: string[];
  otherBenefits?: string[];
};

type Product = {
  _id: string;
  name: string;
  aliases?: string[];
  brand?: string;
  description?: string;
  category?: string;
  ingredients?: Ingredient[];
  useCases?: string[];
  features?: Features;
  isApproved?: boolean;
  verdict?: string;
};

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8004/api/products");
        console.log(response.data);
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedProducts();
  }, []);

  if (loading) return <p>Loading approved products...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No approved products available.</p>;
  console.log(products);
  return (
    <div className="home-page px-6 py-4">
      <h1 className="text-2xl font-bold mb-6">Approved Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
