import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDF8RFUXRMB5j9opsdgkC9do_5YaMOLPE",
  authDomain: "mushroom-recipes-1c2eb.firebaseapp.com",
  projectId: "mushroom-recipes-1c2eb",
  storageBucket: "mushroom-recipes-1c2eb.appspot.com",
  messagingSenderId: "54616764608",
  appId: "1:54616764608:web:9b862b1049cc2de163d25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In Function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Return the signed-in user
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

// Export services and functions
export { db, auth, provider, signInWithGoogle };