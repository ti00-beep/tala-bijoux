import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Clé pour le stockage local
const SETTINGS_KEY = 'tala_settings';

// Numéro par défaut (celui fourni par le client)
const defaultSettings = {
  whatsappNumber: '+213795012127'
};

// Initialisation locale
if (!localStorage.getItem(SETTINGS_KEY)) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
}

// Récupérer les paramètres
export const getSettings = async () => {
  if (db) {
    try {
      const docRef = doc(db, 'settings', 'general');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // Créer le document s'il n'existe pas encore
        await setDoc(docRef, defaultSettings);
        return defaultSettings;
      }
    } catch (e) {
      console.warn("Utilisation du mode local pour les paramètres", e);
      return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || defaultSettings;
    }
  } else {
    // Mode Local
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || defaultSettings;
  }
};

// Mettre à jour les paramètres
export const updateSettings = async (newSettings) => {
  if (db) {
    try {
      const docRef = doc(db, 'settings', 'general');
      await setDoc(docRef, newSettings, { merge: true });
    } catch (e) {
      console.warn("Utilisation du mode local pour sauvegarder", e);
      const current = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || defaultSettings;
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...newSettings }));
    }
  } else {
    // Mode Local
    const current = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || defaultSettings;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...newSettings }));
  }
};
