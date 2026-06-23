import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase de votre projet TALA Bijoux
const firebaseConfig = {
  apiKey: "AIzaSyDaV2SdnqrwiCOwl5w31IJszotPc4_e12Q",
  authDomain: "tala-bijoux.firebaseapp.com",
  projectId: "tala-bijoux",
  storageBucket: "tala-bijoux.firebasestorage.app",
  messagingSenderId: "281812615287",
  appId: "1:281812615287:web:c7ab45f84f8cb49ba8c672",
  measurementId: "G-M26NRVW4K4"
};

// Initialisation de Firebase et Firestore (base de données)
let app;
let db = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log("Firebase connecté avec succès !");
} catch (error) {
  console.error("Erreur d'initialisation Firebase:", error);
}

export { db };
