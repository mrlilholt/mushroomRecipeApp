// App.js (corrected version)
import React, { useState, useCallback } from "react";
import { Box } from "@mui/material";
import Header from "./components/header";
import SearchBar from "./components/SearchBar";
import RecipeGrid from "./components/RecipeGrid";
import FavoritesModal from "./components/FavoritesModal";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import { db } from "./firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { signInWithGoogle } from "./firebase";

function App() {
  const [mushroom, setMushroom] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [viewingFavorites, setViewingFavorites] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch recipes based on user input
  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://mushroomrecipe.onrender.com/search?mushroom=${mushroom}`);
      const data = await response.json();
      setRecipes(
        data.map((recipe) => ({
          ...recipe,
          id: recipe.id || recipe.title, // Ensure unique IDs
        }))
      );
      setViewingFavorites(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Fetch user's favorite recipes
  const fetchFavorites = useCallback(async (currentUser) => {
    if (!currentUser?.uid) {
      console.error("No user is logged in or user data is missing.");
      return;
    }
    try {
      const favoritesRef = collection(db, "favorites");
      const q = query(favoritesRef, where("user", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      setFavorites(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setViewingFavorites(true);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }, []);

  // Add a recipe to favorites
  const addToFavorites = async (recipe) => {
    if (!user) {
      alert("You need to sign in to save favorites!");
      return;
    }

    try {
      const favoritesRef = collection(db, "favorites");
      await addDoc(favoritesRef, { ...recipe, user: user.uid });
      setFavorites((prev) => [...prev, recipe]);
      alert("Recipe added to favorites!");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  // Handle user sign-in
  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result);
      alert(`Welcome, ${result.displayName}!`);
      fetchFavorites(result);
    } catch (error) {
      alert("Failed to sign in. Please try again.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setFavorites([]);
    setViewingFavorites(false);
  };

  // Bottom navigation handlers
  const handleHomeClick = () => {
    setViewingFavorites(false);
  };

  const handleFavoritesClick = () => {
    if (user) {
      setModalOpen(true);
    } else {
      alert("You need to log in to view your favorites!");
    }
  };

  const handleVideosClick = () => {
    alert("Videos feature coming soon!");
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #1e3c72, #2a5298)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <Header
        user={user}
        onSignIn={handleSignIn}
        onLogout={handleLogout}
        onViewFavorites={() => {
          if (user) fetchFavorites(user);
          else alert("You need to sign in to view favorites!");
        }}
      />
      {/* Logo above the search bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <img
          src="/mushroomLogo.png"
          alt="Mushroom Logo"
          style={{ height: "50px" }}
        />
      </Box>
      
      {/* Search Bar */}
      <SearchBar
        mushroom={mushroom}
        setMushroom={setMushroom}
        onSearch={fetchRecipes}
      />

      {/* Recipe Grid */}
      <RecipeGrid
        recipes={viewingFavorites ? favorites : recipes}
        onAddToFavorites={addToFavorites}
      />

      {/* Favorites Modal */}
      <FavoritesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        favorites={favorites}
      />

      {/* Bottom Navigation */}
      <BottomNav
        onHomeClick={handleHomeClick}
        onFavoritesClick={handleFavoritesClick}
        onVideosClick={handleVideosClick}
      />

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default App;
