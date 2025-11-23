import React, { useState, useMemo } from "react";
import { Heart } from "lucide-react";
import "../styles/ChefCard.scss";

export default function ChefCard({ chef }) {
  // Local state for favorite toggle (Visual only)
  const [isFav, setIsFav] = useState(false);

  // Generate random stats once per card
  const mockData = useMemo(() => {
    return {
      rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1), // 4.0 - 5.0
      reviews: Math.floor(Math.random() * 5000) + 500, // 500 - 5000
    };
  }, []);

  return (
    <div className="chef-card">
      <div className="image-container">
        <img src={chef.image} alt={chef.name} />

        {/* Favorite Button */}
        <button
          className="favorite-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevent clicking the card
            setIsFav(!isFav);
          }}
          aria-label="Favorite Chef"
        >
          <Heart size={18} color="#e21f8b" fill={isFav ? "#e21f8b" : "none"} />
        </button>
      </div>

      <div className="chef-info">
        <h3>{chef.name}</h3>
        <span className="occupation">{chef.occupation}</span>
        <p className="description">{chef.description}</p>

        {/* Dynamic Ratings */}
        <div className="rating">
          <span className="score">{mockData.rating}</span>
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
          <span className="count">({mockData.reviews.toLocaleString()})</span>
        </div>
      </div>
    </div>
  );
}
