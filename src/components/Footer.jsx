import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import "../styles/Footer.scss";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container footer-content">
        {/* Left Side: Logo & Copyright */}
        <div className="footer-brand">
          <h2 className="footer-logo">MELO</h2>
          <p>© 2025 - Melo. All rights reserved.</p>
        </div>

        {/* Right Side: Links & Socials */}
        <div className="footer-links-container">
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">FAQs</a>
            <a href="#">Terms & Conditions</a>
          </div>

          <div className="social-icons">
            <span>Follow us on</span>
            <div className="icons">
              <button aria-label="Facebook">
                <Facebook size={20} />
              </button>
              <button aria-label="Twitter">
                <Twitter size={20} />
              </button>
              <button aria-label="LinkedIn">
                <Linkedin size={20} />
              </button>
              <button aria-label="Instagram">
                <Instagram size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
