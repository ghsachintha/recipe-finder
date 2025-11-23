import React from "react";
import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../contexts/FavoritesContext";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/main.scss"; // Ensure global styles (grid) are loaded

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-page container" style={{ paddingTop: "40px" }}>
      <div
        className="page-header"
        style={{
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Heart size={32} color="#e21f8b" />
        <h1 style={{ fontFamily: "Lora, serif", margin: 0 }}>
          My Favorite Recipes
        </h1>
      </div>

      {favorites.length === 0 ? (
        <div
          className="empty-state"
          style={{
            textAlign: "center",
            marginTop: "50px",
            color: "var(--sub-text)",
          }}
        >
          <Heart size={64} color="#ccc" style={{ marginBottom: "20px" }} />
          <h2>No favorites yet</h2>
          <p>Start exploring recipes and add them to your collection!</p>
          <Link
            to="/"
            style={{
              display: "inline-block",
              marginTop: "20px",
              background: "#e21f8b",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Explore Recipes
          </Link>
        </div>
      ) : (
        /* THIS is the key fix: Reuse the grid class */
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
