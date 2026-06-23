import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">TALA</span>
          <span className="logo-subtext">Bijoux & Accessoires</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Boutique</Link>
          <Link to="/shop?category=bagues" onClick={() => setMobileMenuOpen(false)}>Bagues</Link>
          <Link to="/shop?category=colliers" onClick={() => setMobileMenuOpen(false)}>Colliers</Link>
          <Link to="/shop?category=bracelets" onClick={() => setMobileMenuOpen(false)}>Bracelets</Link>
        </nav>

        {/* Icons */}
        <div className="navbar-icons">
          <button className="icon-btn"><Search size={20} /></button>
          <button className="icon-btn"><User size={20} /></button>
          <button className="icon-btn cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
