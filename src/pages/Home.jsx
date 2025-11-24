import React, { useState, useEffect } from "react";
import CategoryLabels from "../components/CategoryLabels";
import RecipeCard from "../components/RecipeCard";
import ChefCard from "../components/ChefCard"; // Import the new component
import { recipeAPI } from "../utils/api";
import "../styles/main.scss";

import gordonImg from "../assets/chefs/GordonRamsay.jpg";
import jamieImg from "../assets/chefs/JamieOliver.jpg";    
import nigellaImg from "../assets/chefs/NigellaLawson.jpg"; 
import wolfgangImg from "../assets/chefs/WolfgangPuck.jpg";

export default function Home({ searchTerm }) {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [quickRecipes, setQuickRecipes] = useState([]); // State for bottom section
  const [loading, setLoading] = useState(true);

  // MOCK DATA: Since API doesn't have chefs, we hardcode them to match design
  const chefs = [
    {
      name: "Gordon Ramsay",
      occupation: "Head Chef",
      description: "Known for his fiery temper and exceptional cooking.",
      image: gordonImg,
    },
    {
      name: "Jamie Oliver",
      occupation: "Restaurateur",
      description: "Advocate for healthy eating and simple recipes.",
      image: jamieImg,
    },
    {
      name: "Nigella Lawson",
      occupation: "Food Writer",
      description: "Famous for her indulgent and comforting cooking style.",
      image: nigellaImg,
    },
    {
      name: "Wolfgang Puck",
      occupation: "Restaurateur",
      description: "A pioneer of modern fusion cuisine.",
      image: wolfgangImg,
    },
  ];

  const fetchData = async (query, type) => {
    setLoading(true);
    try {
      if (type === "search" && query) {
        // If searching, just show results in the main grid
        const data = await recipeAPI.searchByName(query);
        setPopularRecipes(data || []);
        setQuickRecipes([]); // Hide other sections when searching
      } else if (type === "category") {
        const data = await recipeAPI.getByCategory(query);
        setPopularRecipes(data || []);
        setQuickRecipes([]);
      } else {
        // DEFAULT LOAD: Show all 3 sections

        // 1. Popular: Get 'Seafood' (matches your previous screenshot)
        const popular = await recipeAPI.getByCategory("Seafood");
        setPopularRecipes(popular ? popular.slice(0, 4) : []);

        // 2. Quick & Easy: Get 'Breakfast' (usually quick recipes)
        const quick = await recipeAPI.getByCategory("Breakfast");
        setQuickRecipes(quick ? quick.slice(0, 4) : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm, "search");
  }, [searchTerm]);

  return (
    <div className="homepage">

      {/* Only show labels if NOT searching, to keep UI clean */}
      {!searchTerm && (
        <CategoryLabels
          onSelect={(category) => fetchData(category, "category")}
        />
      )}

      <div className="container" style={{ paddingBottom: "60px",marginTop: "56px" }}>
        {/* SECTION 1: MOST POPULAR */}
        <section className="recipe-section">
          <div className="section-header">
            <h2 className="section-title">
              {searchTerm ? `Results for "${searchTerm}"` : "Most Popular"}
            </h2>
            {!searchTerm && <button className="show-more">Show more</button>}
          </div>

          <div className="recipe-grid">
            {popularRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* SECTION 2: CHEFS (Only show if not searching) */}
        {!searchTerm && (
          <section className="recipe-section" style={{ marginTop: "56px" }}>
            <div className="section-header">
              <h2 className="section-title">Explore the best recipes from</h2>
              <button className="show-more">Show more</button>
            </div>

            <div className="recipe-grid">
              {chefs.map((chef, index) => (
                <ChefCard key={index} chef={chef} />
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: QUICK & EASY (Only show if not searching) */}
        {!searchTerm && quickRecipes.length > 0 && (
          <section className="recipe-section" style={{ marginTop: "56px" }}>
            <div className="section-header">
              <h2 className="section-title">Quick & Easy</h2>
              <button className="show-more">Show more</button>
            </div>

            <div className="recipe-grid">
              {quickRecipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
