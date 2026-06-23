import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import './Shop.css';

import { getProducts } from '../services/productService';
import { getCollections } from '../services/collectionService';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('tout');
  const [activePrice, setActivePrice] = useState('tout');
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: 'tout', name: 'Tout voir' }]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setAllProducts(data);
      
      const collectionsData = await getCollections();
      setCategories(collectionsData);
      
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryQuery = params.get('category');
    if (categoryQuery && categories.some(c => c.id === categoryQuery)) {
      setActiveCategory(categoryQuery);
    } else {
      setActiveCategory('tout');
    }
    window.scrollTo(0, 0);
  }, [location]);

  const filteredProducts = allProducts.filter(p => {
    // Category filter
    if (activeCategory !== 'tout' && p.category !== activeCategory) return false;
    
    // Price filter
    if (activePrice !== 'tout') {
      const priceNum = parseInt(p.price.replace(/[^0-9]/g, ''), 10) || 0;
      if (activePrice === 'moins_1500' && priceNum >= 1500) return false;
      if (activePrice === '1500_3000' && (priceNum < 1500 || priceNum > 3000)) return false;
      if (activePrice === 'plus_3000' && priceNum <= 3000) return false;
    }
    
    return true;
  });

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container text-center">
          <h1>Notre Boutique</h1>
          <p>Découvrez l'ensemble de nos créations artisanales</p>
        </div>
      </div>

      <div className="container shop-container">
        {/* Sidebar Filter */}
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h3 className="filter-title">Collections <Filter size={16} /></h3>
            <ul className="filter-list">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button 
                    className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.name || cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="filter-group">
            <h3 className="filter-title">Prix <ChevronDown size={16} /></h3>
            <ul className="filter-list">
              <li>
                <button 
                  className={`filter-btn ${activePrice === 'tout' ? 'active' : ''}`}
                  onClick={() => setActivePrice('tout')}
                >
                  Tous les prix
                </button>
              </li>
              <li>
                <button 
                  className={`filter-btn ${activePrice === 'moins_1500' ? 'active' : ''}`}
                  onClick={() => setActivePrice('moins_1500')}
                >
                  Moins de 1500 DA
                </button>
              </li>
              <li>
                <button 
                  className={`filter-btn ${activePrice === '1500_3000' ? 'active' : ''}`}
                  onClick={() => setActivePrice('1500_3000')}
                >
                  1500 DA - 3000 DA
                </button>
              </li>
              <li>
                <button 
                  className={`filter-btn ${activePrice === 'plus_3000' ? 'active' : ''}`}
                  onClick={() => setActivePrice('plus_3000')}
                >
                  Plus de 3000 DA
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="shop-content">
          <div className="shop-toolbar">
            <span>{filteredProducts.length} produits</span>
            <select className="sort-select">
              <option>Nouveautés</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
              <option>Populaires</option>
            </select>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card animate-fade-in">
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
        </div>
      </div>
    </div>
  );
};

export default Shop;
