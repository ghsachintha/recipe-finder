import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { recipeAPI } from '../utils/api';
import { Heart, ChevronLeft, Clock, Calendar, ShoppingBag, Star } from 'lucide-react'; 
import '../styles/RecipeDetails.scss';

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Random Stats (to match your design mockups)
  const mockData = useMemo(() => {
    return {
      time: "30 min",
      date: "21-11-2025",
      rating: 4.6,
      reviews: "241,985",
      authorName: "FirstName LastName",
      authorImg: "https://i.pravatar.cc/150?u=a042581f4e29026704d" // Random avatar
    };
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await recipeAPI.getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!recipe) return <div className="error-screen">Recipe not found</div>;

  // 1. EXTRACT INGREDIENTS & IMAGES
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({
        name: name,
        measure: measure,
        // TheMealDB provides ingredient thumbnails at this URL:
        image: `https://www.themealdb.com/images/ingredients/${name}.png`
      });
    }
  }

  // 2. PARSE INSTRUCTIONS INTO STEPS
  // We split by newlines to create "Step 1, Step 2..."
  const instructionsList = recipe.strInstructions
    .split(/\r\n|\n|\r/) // Split by new line
    .filter(step => step.trim().length > 10); // Remove empty/short lines

  const isFav = isFavorite(recipe.idMeal);

  return (
    <div className="recipe-details-page">
      <div className="container">
        
        {/* Back Link */}
        <button onClick={() => navigate(-1)} className="back-link">
          <ChevronLeft size={16} /> Back to Recipes
        </button>

        {/* --- HERO IMAGE --- */}
        <div className="hero-section">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="hero-img" />
          <button 
            className="fav-btn" 
            onClick={() => toggleFavorite(recipe)}
          >
            <Heart size={24} color="#e21f8b" fill={isFav ? "#e21f8b" : "none"} />
          </button>
        </div>

        {/* --- META DATA --- */}
        <div className="meta-bar">
          <span className="tag-easy">Easy</span>
          <div className="meta-item">
            <Clock size={16} /> <span>{mockData.time}</span>
          </div>
          <div className="meta-item">
            <ShoppingBag size={16} /> <span>{ingredients.length} ingredients</span>
          </div>
          <div className="meta-item">
            <Calendar size={16} /> <span>{mockData.date}</span>
          </div>
        </div>

        {/* --- TITLE & RATING --- */}
        <h1 className="recipe-title">{recipe.strMeal}</h1>
        <div className="rating-row">
          <span className="score">{mockData.rating}</span>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < 4 ? "#FFC107" : "#E0E0E0"} stroke="none" />
            ))}
          </div>
          <span className="reviews">({mockData.reviews})</span>
        </div>

        {/* --- AUTHOR --- */}
        <div className="author-block">
          <img src={mockData.authorImg} alt="Author" className="author-img" />
          <div className="author-info">
            <span className="name">{mockData.authorName}</span>
            <span className="role">Contributor</span>
          </div>
        </div>

        {/* --- INGREDIENTS GRID --- */}
        <section className="ingredients-section">
          <h3>Ingredients</h3>
          <div className="ingredients-grid">
            {ingredients.map((item, index) => (
              <div key={index} className="ingredient-card">
                <div className="img-circle">
                  <img src={item.image} alt={item.name} />
                </div>
                <span className="ing-name">{item.name}</span>
                <span className="ing-qty">{item.measure}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- STEPS (INSTRUCTIONS) --- */}
        <section className="steps-section">
          {instructionsList.map((stepText, index) => (
            <div key={index} className="step-block">
              <h3>Step {index + 1}/{instructionsList.length}</h3>
              {/* Placeholder Image for Step (Using Main thumb as we don't have step photos) */}
              <div className="step-img-container">
                <img src={recipe.strMealThumb} alt={`Step ${index + 1}`} />
              </div>
              <p>{stepText}</p>
            </div>
          ))}
          
          {/* Final "Enjoy" Block */}
          <div className="step-block">
            <h3>Enjoy your meal!</h3>
            <div className="step-img-container">
                <img src={recipe.strMealThumb} alt="Final Result" />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur. Curabitur id iaculis at neque aliquam pellentesque...</p>
          </div>
        </section>

      </div>
    </div>
  );
}