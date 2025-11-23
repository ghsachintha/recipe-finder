import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react'; // Import Heart
import '../styles/Navigation.scss';

export default function Navigation() {
  return (
    <nav className="sub-nav">
      <div className="container nav-content">
        
        {/* Desktop Links (Hidden on Mobile) */}
        <ul className="nav-links desktop-only-flex">
          <li><Link to="/" className="nav-item">Latest</Link></li>
          <li><Link to="/" className="nav-item active">Popular</Link></li>
          <li><Link to="/favorites" className="nav-item">Loved</Link></li>
          <li><Link to="/" className="nav-item">Trends</Link></li>
        </ul>

        {/* Action Buttons (Visible always, styles change on mobile) */}
        <div className="nav-actions">
          
          <Link to="/surprise" className="btn-white">
            Surprise Me!
          </Link>

          {/* Logic: On Desktop -> 'Favorites' Text Button
                     On Mobile  -> Heart Icon Circle Button */}
          <Link to="/favorites" className="btn-pink favorites-btn-responsive">
             <span className="text">Favorites</span>
             <span className="icon"><Heart size={20} fill="white" /></span>
          </Link>

        </div>
      </div>
    </nav>
  );
}