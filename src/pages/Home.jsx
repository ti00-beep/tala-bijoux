import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Home.css';
import { getProducts } from '../services/productService';
import { getCollections } from '../services/collectionService';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      setFeaturedProducts(productsData.slice(0, 4));
      
      const collectionsData = await getCollections();
      setCollections(collectionsData.filter(c => c.id !== 'tout').slice(0, 3));
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade-in">
          <span className="hero-subtitle">Vente en ligne</span>
          <h1 className="hero-title">L'Éclat de<br/>Votre Beauté</h1>
          <p className="hero-desc">Découvrez notre collection exclusive de bijoux et accessoires. Livraison disponible dans 58 wilayas.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">Découvrir</Link>
            <Link to="/shop?category=accessoires" className="btn btn-outline hero-btn-outline">Nos Accessoires</Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories-section container">
        <div className="section-header">
          <h2>Nos Collections</h2>
          <p>Trouvez la pièce parfaite pour chaque occasion</p>
        </div>
        
        <div className="categories-grid">
          {collections.map(collection => (
            <Link key={collection.id} to={`/shop?category=${collection.id}`} className="category-card">
              <img src={collection.image} alt={collection.name} />
              <div className="category-content">
                <h3>{collection.name}</h3>
                <span>Voir la collection <ArrowRight size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section container">
        <div className="section-header">
          <h2>Pièces Phares</h2>
          <p>Les favoris de nos clientes</p>
        </div>

        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-actions">
                  <button className="btn btn-primary add-to-cart" onClick={() => addToCart(product)}>
                    Ajouter au panier
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <span className="product-price">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <Link to="/shop" className="btn btn-outline">Voir tout le catalogue</Link>
        </div>
      </section>

      {/* Brand Story */}
      <section className="brand-story">
        <div className="container story-container">
          <div className="story-content">
            <h2>À propos de TALA</h2>
            <p>Bienvenue sur votre boutique de vente en ligne. TALA Bijoux & Accessoires est située à <strong>Reghaia, Alger</strong>.</p>
            <p>Nous proposons une large sélection de bijoux et accessoires de haute qualité. La <strong>livraison est disponible vers 58 wilayas</strong> pour vous servir partout où vous êtes.</p>
            <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: 'var(--color-primary)' }}>
              <strong>Contact : 0795 01 21 27</strong>
            </p>
          </div>
          <div className="story-image">
            <img src="https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=800&auto=format&fit=crop" alt="Boutique TALA" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
