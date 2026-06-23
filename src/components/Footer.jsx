import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-text">TALA</span>
            <span className="logo-subtext">Bijoux & Accessoires</span>
          </div>
          <p className="footer-desc">
            Vente en ligne de bijoux et accessoires. <br/>
            📍 Reghaia, Alger<br/>
            📞 0795 01 21 27<br/>
            🚚 Livraison disponible vers 58 wilayas.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Mail"><Mail size={20} /></a>
            <a href="#" aria-label="Phone"><Phone size={20} /></a>
            <a href="#" aria-label="MapPin"><MapPin size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Boutique</h3>
          <ul>
            <li><a href="/shop?category=bagues">Bagues</a></li>
            <li><a href="/shop?category=colliers">Colliers</a></li>
            <li><a href="/shop?category=bracelets">Bracelets</a></li>
            <li><a href="/shop?category=boucles">Boucles d'oreilles</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Informations</h3>
          <ul>
            <li><a href="#">À propos de nous</a></li>
            <li><a href="#">Livraison & Retours</a></li>
            <li><a href="#">Entretien des bijoux</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h3>Newsletter</h3>
          <p>Inscrivez-vous pour recevoir nos offres exclusives et nos nouveautés.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Votre adresse email" required />
            <button type="submit" aria-label="Subscribe"><Mail size={18} /></button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TALA Bijoux & Accessoires. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
