// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // For Firestore database
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
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

// Export Firebase services for use in the app
export { db, auth, provider };

