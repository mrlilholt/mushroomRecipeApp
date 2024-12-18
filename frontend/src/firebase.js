// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF8RFUXRMB5j9opsdgkC9do_5YaMOLPE",
  authDomain: "mushroom-recipes-1c2eb.firebaseapp.com",
  projectId: "mushroom-recipes-1c2eb",
  storageBucket: "mushroom-recipes-1c2eb.appspot.com",
  messagingSenderId: "54616764608",
  appId: "1:54616764608:web:9b862b1049cc2de163d25",
  measurementId: "G-K5MB451GRB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Return the signed-in user
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return null; // Return null if there's an error
  }
};

// Export Firebase services
export { db, auth, provider };
