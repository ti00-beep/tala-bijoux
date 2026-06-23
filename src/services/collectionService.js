import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const defaultCollections = [
  { id: 'tout', name: 'Tout voir', image: '' },
  { id: 'accessoires', name: 'Accessoires', image: 'https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=800&auto=format&fit=crop' },
  { id: 'bagues', name: 'Bagues', image: 'https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=800&auto=format&fit=crop' },
  { id: 'colliers', name: 'Colliers', image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00ea?q=80&w=800&auto=format&fit=crop' },
  { id: 'bracelets', name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop' }
];

if (!localStorage.getItem('tala_collections')) {
  localStorage.setItem('tala_collections', JSON.stringify(defaultCollections));
}

export const getCollections = async () => {
  if (db) {
    try {
      const querySnapshot = await getDocs(collection(db, 'collections'));
      if (querySnapshot.empty) {
        // Return defaults if db is empty
        return defaultCollections;
      }
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn("Utilisation du mode local pour les collections", e);
      return JSON.parse(localStorage.getItem('tala_collections')) || defaultCollections;
    }
  } else {
    return JSON.parse(localStorage.getItem('tala_collections')) || defaultCollections;
  }
};

export const addCollection = async (collectionData) => {
  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'collections'), collectionData);
      return docRef.id;
    } catch (e) {
      const collections = JSON.parse(localStorage.getItem('tala_collections')) || [];
      const newCollection = { ...collectionData, id: collectionData.name.toLowerCase().replace(/[^a-z0-9]/g, '-') };
      collections.push(newCollection);
      localStorage.setItem('tala_collections', JSON.stringify(collections));
      return newCollection.id;
    }
  } else {
    const collections = JSON.parse(localStorage.getItem('tala_collections')) || [];
    // Gérer l'id unique basé sur le nom
    const newCollection = { ...collectionData, id: collectionData.name.toLowerCase().replace(/[^a-z0-9]/g, '-') };
    collections.push(newCollection);
    localStorage.setItem('tala_collections', JSON.stringify(collections));
    return newCollection.id;
  }
};

export const deleteCollection = async (collectionId) => {
  if (collectionId === 'tout') return; // Ne pas supprimer "Tout voir"
  
  if (db) {
    try {
      await deleteDoc(doc(db, 'collections', collectionId));
    } catch (e) {
      let collections = JSON.parse(localStorage.getItem('tala_collections')) || [];
      collections = collections.filter(c => c.id !== collectionId);
      localStorage.setItem('tala_collections', JSON.stringify(collections));
    }
  } else {
    let collections = JSON.parse(localStorage.getItem('tala_collections')) || [];
    collections = collections.filter(c => c.id !== collectionId);
    localStorage.setItem('tala_collections', JSON.stringify(collections));
  }
};
