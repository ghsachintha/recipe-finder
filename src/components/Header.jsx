import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { Search, Sun, Moon, Menu, X } from "lucide-react";
import "../styles/Header.scss";

export default function Header({ onSearch, toggleMenu, isMenuOpen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* 1. LEFT: Mobile Toggle & Logo */}
        <div className="header-left">
            <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="logo" onClick={() => { setSearchTerm(""); if(onSearch) onSearch(""); }}>
                MELO
            </Link>
        </div>

        {/* 2. RIGHT GROUP (Desktop Only) */}
        {/* We group Theme Toggle AND Search here to push them to the right */}
        <div className="header-right desktop-only">
             {/* Theme Toggle */}
            <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} color="white" />}
            </button>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="search-form">
                <Search size={18} className="search-icon" color="#949da5" />
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
        </div>

        {/* 3. MOBILE: Search Icon (Right) */}
        <button className="mobile-search-btn" aria-label="Search">
           <Search size={24} />
        </button>
      </div>
    </header>
  );
}