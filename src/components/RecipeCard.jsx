import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Calendar } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";
import "../styles/RecipeCard.scss";

export default function RecipeCard({ recipe }) {
  if (!recipe) return null;
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const favorite = isFavorite(recipe.idMeal);

  // --- RANDOMIZED DATA GENERATOR ---
  const mockData = useMemo(() => {
    return {
      time: Math.floor(Math.random() * 45) + 15,
      rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
      reviews: Math.floor(Math.random() * 5000) + 500,
      difficulty: Math.random() > 0.5 ? "Easy" : "Medium",
    };
  }, []);

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  // --- SAFE DATA HANDLING ---
  // If category is missing (from Filter API), use "Meal"
  const category = recipe.strCategory || "Meal";
  // If area is missing, use "International"
  const area = recipe.strArea || "International";

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <div className="card-image-container">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="card-image"
        />

        {/* Favorite Button */}
        <button
          className="favorite-btn"
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
        >
          <Heart
            size={18}
            fill={favorite ? "#e21f8b" : "none"}
            color={favorite ? "#e21f8b" : "#e21f8b"}
          />
        </button>

        {/* Dynamic Time Badge */}
        <div className="time-badge">{mockData.time} min</div>
      </div>

      <div className="card-content">
        {/* Meta Row */}
        <div className="card-meta">
          <span
            className={`difficulty-tag ${mockData.difficulty.toLowerCase()}`}
          >
            {mockData.difficulty}
          </span>
          <span className="date-tag">
            <Calendar size={14} style={{ marginRight: 6 }} /> 21-11-2025
          </span>
        </div>

        <h3 className="card-title">{recipe.strMeal}</h3>

        <p className="recipe-owner">
          recipe by <strong>FirstName LastName</strong>
        </p>

        {/* FIX: Use the safe variables (category/area) so .toLowerCase() doesn't crash */}
        <p className="recipe-desc">
          A delicious {area} dish featuring {category.toLowerCase()}...
        </p>

        {/* Dynamic Ratings */}
        <div className="rating-row">
          <span className="rating-score">{mockData.rating}</span>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`star ${
                  i < Math.floor(mockData.rating) ? "filled" : ""
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="review-count">
            ({mockData.reviews.toLocaleString()})
          </span>
        </div>
      </div>
    </div>
  );
}
