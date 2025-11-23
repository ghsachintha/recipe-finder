import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, X } from 'lucide-react';
import '../styles/MobileMenu.scss';

export default function MobileMenu({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu-content">
        
        {/* Header: Just the Close Button, aligned right */}
        <div className="menu-header">
            <button onClick={onClose} className="close-btn" aria-label="Close Menu">
                <X size={28} />
            </button>
        </div>

        {/* Links */}
        <ul className="mobile-links">
          <li><Link to="/" onClick={onClose}>Latest</Link></li>
          <li><Link to="/" onClick={onClose}>Popular</Link></li>
          <li><Link to="/favorites" onClick={onClose}>Loved</Link></li>
          <li><Link to="/" onClick={onClose}>Trends</Link></li>
        </ul>

        {/* Footer: Just the Toggle, aligned left */}
        <div className="menu-footer">
            <button onClick={toggleTheme} className="theme-toggle-large">
                {theme === 'light' ? (
                    <><Moon size={20} /> Dark Mode</>
                ) : (
                    <><Sun size={20} /> Light Mode</>
                )}
            </button>
        </div>
      </div>
    </div>
  );
}