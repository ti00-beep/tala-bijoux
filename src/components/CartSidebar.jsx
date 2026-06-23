import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getSettings } from '../services/settingsService';
import './CartSidebar.css';

const CartSidebar = () => {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSettings();
      if (settings && settings.whatsappNumber) {
        setWhatsappNumber(settings.whatsappNumber.replace('+', ''));
      }
    };
    fetchSettings();
  }, [isCartOpen]);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const num = whatsappNumber || '213795012127';
    
    // Format the order message
    let message = `*Nouvelle Commande TALA Bijoux*\n\n`;
    cartItems.forEach(item => {
      message += `- ${item.name} (${item.price}) x ${item.quantity}\n`;
    });
    message += `\n*Total : ${cartTotal} DA*`;

    window.open(`https://wa.me/${num}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`} 
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2><ShoppingBag size={24} /> Votre Panier</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} />
              <p>Votre panier est vide.</p>
              <button className="btn btn-outline" onClick={() => setIsCartOpen(false)}>
                Continuer mes achats
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <span className="cart-item-price">{item.price}</span>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        className="remove-item" 
                        onClick={() => removeFromCart(item.id)}
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total :</span>
              <span>{cartTotal} DA</span>
            </div>
            <button className="btn btn-primary btn-full checkout-btn" onClick={handleCheckout}>
              Commander via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
