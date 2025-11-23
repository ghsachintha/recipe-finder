// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import MobileMenu from './components/MobileMenu'; // Import New Component
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Surprise from './pages/Surprise';
import RecipeDetails from './pages/RecipeDetails';
import Footer from './components/Footer';
import { useTheme } from './contexts/ThemeContext';
import './styles/main.scss';

function App() {
  const { theme } = useTheme();
  const [globalSearch, setGlobalSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`app-container ${theme}`}>
      <Header 
        onSearch={setGlobalSearch} 
        toggleMenu={() => setIsMobileMenuOpen(true)} 
        isMenuOpen={isMobileMenuOpen}
      />
      
      {/* 1. Persistent Black Bar */}
      <Navigation />

      {/* 2. Slide-out Drawer */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home searchTerm={globalSearch} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/surprise" element={<Surprise />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;