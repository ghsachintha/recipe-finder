import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { recipeAPI } from "../utils/api";
import "../styles/Surprise.scss"; // We will style this locally

export default function Surprise() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRandom = async () => {
    setLoading(true);
    try {
      const data = await recipeAPI.getRandomRecipe();
      setRecipe(data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandom();
  }, []);

  if (loading)
    return <div className="loading-screen">✨ Finding a surprise...</div>;

  return (
    <div className="surprise-page">

      <main className="container surprise-container">
        <div className="surprise-header">
          <div className="icon-circle">✨</div>
          <h1>Surprise Recipe!</h1>
          <p>Here's a random recipe just for you</p>
        </div>

        {recipe && (
          <div className="big-recipe-card">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <div className="content">
              <h2>{recipe.strMeal}</h2>
              <div className="tags">
                <span className="tag green">{recipe.strCategory}</span>
                <span className="tag outline">{recipe.strArea}</span>
              </div>
              <p className="instructions">
                {recipe.strInstructions?.slice(0, 150)}...
              </p>

              <div className="actions">
                <button
                  className="btn-primary"
                  onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                >
                  View Full Recipe
                </button>
                <button className="btn-secondary" onClick={loadRandom}>
                  🔄 Try Another
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
