import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

// Données initiales pour le mode local
const defaultProducts = [
  { 
    id: '1', 
    name: 'Parure en Or', 
    description: 'Une très belle parure pour femme avec boucles et collier.',
    price: '2500 DA', 
    category: 'accessoires', 
    image: 'https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: '2', 
    name: 'Collier Simple', 
    description: 'Collier élégant parfait pour un cadeau.',
    price: '1200 DA', 
    category: 'colliers', 
    image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00ea?q=80&w=800&auto=format&fit=crop' 
  }
];

// Initialise le stockage local si vide
if (!localStorage.getItem('tala_products')) {
  localStorage.setItem('tala_products', JSON.stringify(defaultProducts));
}

// Récupérer tous les produits
export const getProducts = async () => {
  if (db) {
    // Mode Firebase
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } else {
    // Mode Local
    return JSON.parse(localStorage.getItem('tala_products')) || [];
  }
};

// Ajouter un produit
export const addProduct = async (productData) => {
  if (db) {
    // Mode Firebase
    const docRef = await addDoc(collection(db, 'products'), productData);
    return docRef.id;
  } else {
    // Mode Local
    const products = JSON.parse(localStorage.getItem('tala_products')) || [];
    const newProduct = { ...productData, id: Date.now().toString() };
    products.push(newProduct);
    localStorage.setItem('tala_products', JSON.stringify(products));
    return newProduct.id;
  }
};

// Supprimer un produit
export const deleteProduct = async (productId) => {
  if (db) {
    // Mode Firebase
    await deleteDoc(doc(db, 'products', productId));
  } else {
    // Mode Local
    let products = JSON.parse(localStorage.getItem('tala_products')) || [];
    products = products.filter(p => p.id !== productId);
    localStorage.setItem('tala_products', JSON.stringify(products));
  }
};
