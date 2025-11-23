import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.find((r) => r.idMeal === recipe.idMeal);
      if (exists) {
        return prev.filter((r) => r.idMeal !== recipe.idMeal); // Remove
      }
      return [...prev, recipe]; // Add
    });
  };

  const isFavorite = (id) => {
    return favorites.some((r) => r.idMeal === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
