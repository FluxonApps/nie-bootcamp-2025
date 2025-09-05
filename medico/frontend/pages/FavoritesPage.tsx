import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import "./FavoritesPage.css";

const FavoritesPage: React.FC = () => {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:8004/api/auth/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data.favorites || []);
      } catch (err) {
        console.error("Failed to fetch favorites", err);
      }
    };
    fetchFavorites();
  }, [token]);

  if (!favorites.length) return <p>No favorites yet.</p>;

  return (
    <div className="favorites-page">
      <h2>Your Favorites ❤️</h2>
      <div className="product-list">
        {favorites.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
