import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, deleteProduct } from '../services/productService';
import { getCollections, addCollection, deleteCollection } from '../services/collectionService';
import { getSettings, updateSettings } from '../services/settingsService';
import { Trash2, Plus, Image as ImageIcon, Lock, Phone, Layers } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Settings state
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('accessoires');
  const [image, setImage] = useState('');

  // Collection form state
  const [collectionName, setCollectionName] = useState('');
  const [collectionImage, setCollectionImage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'tala2026') {
      setIsAuthenticated(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const loadData = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    
    const collectionsData = await getCollections();
    setCollections(collectionsData);
    if (collectionsData.length > 0 && !collectionsData.find(c => c.id === category)) {
       const firstRealCol = collectionsData.find(c => c.id !== 'tout');
       if (firstRealCol) setCategory(firstRealCol.id);
    }
    
    const settings = await getSettings();
    if (settings && settings.whatsappNumber) {
      setWhatsappNumber(settings.whatsappNumber);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSavingSettings(true);
    await updateSettings({ whatsappNumber });
    setIsSavingSettings(false);
    alert('Réglages sauvegardés avec succès !');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !image) return alert("Veuillez remplir les champs obligatoires (Nom, Prix, Image).");

    const newProduct = {
      name,
      description,
      price: price.includes('DA') ? price : `${price} DA`,
      category,
      image
    };

    await addProduct(newProduct);
    
    // Reset form
    setName('');
    setDescription('');
    setPrice('');
    setCategory('accessoires');
    setImage('');
    
    // Reload list
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      await deleteProduct(id);
      loadData();
    }
  };

  const handleAddCollection = async (e) => {
    e.preventDefault();
    if (!collectionName || !collectionImage) return alert("Veuillez remplir les champs.");
    
    await addCollection({ name: collectionName, image: collectionImage });
    setCollectionName('');
    setCollectionImage('');
    loadData();
  };

  const handleDeleteCollection = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette collection ?')) {
      await deleteCollection(id);
      loadData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="admin-panel" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ justifyContent: 'center' }}><Lock size={24} /> Accès Réservé</h2>
          <form className="admin-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Mot de passe</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Entrez le mot de passe" 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full">Se Connecter</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page container">
      <div className="admin-header">
        <h1>Panneau d'Administration</h1>
        <p>Gérez les produits de votre boutique et vos réglages.</p>
      </div>

      {/* Section Réglages */}
      <div className="admin-panel" style={{ marginBottom: '3rem' }}>
        <h2><Phone size={20} /> Réglages des Commandes (WhatsApp)</h2>
        <form className="admin-form" onSubmit={handleSaveSettings} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Numéro de Téléphone (avec indicatif, ex: +213795012127)</label>
            <input 
              type="text" 
              value={whatsappNumber} 
              onChange={(e) => setWhatsappNumber(e.target.value)} 
              placeholder="+213..." 
              required 
            />
          </div>
          <button type="submit" className="btn btn-outline" disabled={isSavingSettings}>
            {isSavingSettings ? 'Sauvegarde...' : 'Sauvegarder le numéro'}
          </button>
        </form>
      </div>

      <div className="admin-grid">
        {/* Ajouter un produit */}
        <div className="admin-panel">
          <h2><Plus size={20} /> Ajouter un Nouveau Produit</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom du Produit *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Bracelet en Or" required />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Petite description..."></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Prix *</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex: 1500" required />
              </div>

              <div className="form-group">
                <label>Collection *</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {collections.filter(c => c.id !== 'tout').map(col => (
                    <option key={col.id} value={col.id}>{col.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label><ImageIcon size={16} /> Lien de l'image (Lien web direct ou Google Drive) *</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." required />
              <small className="help-text">Collez n'importe quel lien direct vers une photo sur internet.</small>
            </div>

            <button type="submit" className="btn btn-primary btn-full">Publier le produit</button>
          </form>
        </div>

        {/* Liste des produits */}
        <div className="admin-panel">
          <h2>Vos Produits ({products.length})</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <div className="product-list">
              {products.map(product => (
                <div key={product.id} className="admin-product-card">
                  <img src={product.image} alt={product.name} className="admin-product-img" />
                  <div className="admin-product-info">
                    <h4>{product.name}</h4>
                    <span>{product.price} - {product.category}</span>
                  </div>
                  <button onClick={() => handleDelete(product.id)} className="btn-delete" title="Supprimer">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              {products.length === 0 && <p>Aucun produit dans la boutique.</p>}
            </div>
          )}
        </div>
      </div>

      {/* Gérer les collections */}
      <div className="admin-grid" style={{ marginTop: '3rem' }}>
        <div className="admin-panel">
          <h2><Layers size={20} /> Ajouter une Collection</h2>
          <form className="admin-form" onSubmit={handleAddCollection}>
            <div className="form-group">
              <label>Nom de la Collection *</label>
              <input type="text" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} placeholder="Ex: Montres" required />
            </div>
            <div className="form-group">
              <label><ImageIcon size={16} /> Lien de l'image *</label>
              <input type="text" value={collectionImage} onChange={(e) => setCollectionImage(e.target.value)} placeholder="https://..." required />
            </div>
            <button type="submit" className="btn btn-primary btn-full">Ajouter la collection</button>
          </form>
        </div>

        <div className="admin-panel">
          <h2>Vos Collections</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <div className="product-list">
              {collections.filter(c => c.id !== 'tout').map(col => (
                <div key={col.id} className="admin-product-card">
                  <img src={col.image} alt={col.name} className="admin-product-img" />
                  <div className="admin-product-info">
                    <h4>{col.name}</h4>
                  </div>
                  <button onClick={() => handleDeleteCollection(col.id)} className="btn-delete" title="Supprimer">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
