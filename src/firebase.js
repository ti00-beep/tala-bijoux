import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Remplacez ces fausses informations par celles de votre projet Firebase
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// On initialise Firebase seulement si l'apiKey a été changée
let app;
let db = null;

try {
  if (firebaseConfig.apiKey !== "VOTRE_API_KEY") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase connecté avec succès !");
  } else {
    console.warn("⚠️ Firebase n'est pas encore configuré. Le site utilise le mode Local (simulé).");
  }
} catch (error) {
  console.error("Erreur d'initialisation Firebase:", error);
}

export { db };
