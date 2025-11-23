import React, { useState } from "react";
import "../styles/CategoryLabels.scss";

// Top searched/useful labels for a recipe app
const LABELS = [
  "20 Minute Meals",
  "Chicken",
  "Vegetarian",
  "Pasta",
  "Dessert",
  "Breakfast",
  "Healthy",
  "Vegan",
  "Seafood",
  "Beef",
  "Salad",
  "Soup",
  "Italian",
  "Mexican",
  "Chinese",
  "Low Carb",
  "Gluten Free",
  "Spicy",
  "Baking",
  "Smoothies",
];

export default function CategoryLabels({ onSelect }) {
  const [showAll, setShowAll] = useState(false);

  // Show first 10 if collapsed, or all if expanded
  const visibleLabels = showAll ? LABELS : LABELS.slice(0, 10);

  return (
    <div className="label-section container">
      <div className="label-header">
        <h3>Labels</h3>
        <button className="show-all-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show All"}
        </button>
      </div>

      <div className="label-grid">
        {visibleLabels.map((label) => (
          <button
            key={label}
            className="label-pill"
            onClick={() => onSelect(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
