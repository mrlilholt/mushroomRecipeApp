import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Card, CardMedia, Typography, Grid, Button, IconButton } from "@mui/material";
import { db } from "./firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { signInWithGoogle } from "./firebase";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function App() {
  const [mushroom, setMushroom] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [user, setUser] = useState(null);
  const [viewingFavorites, setViewingFavorites] = useState(false);

  // Fetch user's favorite recipes
  const fetchFavorites = useCallback(async () => {
    if (!user) {
      alert("You need to sign in to view your favorites!");
      return;
    }

    try {
      const favoritesRef = collection(db, "favorites");
      const q = query(favoritesRef, where("user", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedFavorites = querySnapshot.docs.map((doc) => doc.data());
      setFavorites(fetchedFavorites);
      setFavoriteIds(new Set(fetchedFavorites.map((fav) => fav.id))); // Track favorite IDs
      setViewingFavorites(true);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchFavorites();
  }, [user, fetchFavorites]);

  // Function to fetch recipes
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://mushroomrecipe.onrender.com/search?mushroom=${mushroom}`
      );
      setRecipes(response.data);
      setViewingFavorites(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Google Sign-In Function
  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result) {
        setUser(result);
        alert(`Welcome, ${result.displayName}!`);
      }
    } catch (error) {
      alert("Failed to sign in. Please try again.");
    }
  };

  // Save or remove favorite recipe to/from Firestore
  const toggleFavorite = async (recipe) => {
    if (!user) {
      alert("You need to sign in to save favorites!");
      return;
    }

    try {
      if (favoriteIds.has(recipe.id)) {
        const favoritesRef = collection(db, "favorites");
        const q = query(
          favoritesRef,
          where("user", "==", user.uid),
          where("id", "==", recipe.id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (docSnap) => {
          await deleteDoc(doc(db, "favorites", docSnap.id));
        });
        setFavoriteIds((prev) => {
          const updated = new Set(prev);
          updated.delete(recipe.id);
          return updated;
        });
        alert("Recipe removed from favorites!");
      } else {
        const favoritesRef = collection(db, "favorites");
        await addDoc(favoritesRef, {
          ...recipe,
          user: user.uid,
        });
        setFavoriteIds((prev) => new Set(prev).add(recipe.id));
        alert("Recipe saved to favorites!");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
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
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 3, color: "white" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 1 }}>
          <img
            src="/mushroomLogo.png"
            alt="Mushroom Recipe Logo"
            style={{ width: "80px", height: "auto" }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            textAlign: "center",
            marginBottom: 2,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            color: "#fff",
          }}
        >
          Mushroom Recipe Finder
        </Typography>

        {/* Sign-In Section */}
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
          {!user ? (
            <Button
              variant="contained"
              onClick={handleSignIn}
              sx={{ background: "#6dd5ed", color: "white" }}
            >
              Sign in with Google
            </Button>
          ) : (
            <Typography variant="h6">Welcome, {user.displayName}! 🎉</Typography>
          )}
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginBottom: 3,
          }}
        >
          <input
            type="text"
            placeholder="Search for mushrooms..."
            value={mushroom}
            onChange={(e) => setMushroom(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "25px",
              border: "none",
              width: "300px",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <Button
            onClick={fetchRecipes}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #6dd5ed, #2193b0)",
              color: "white",
              borderRadius: "25px",
              padding: "10px 20px",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(135deg, #5ab4d7, #1b7e95)",
              },
            }}
          >
            Search
          </Button>
          {user && (
            <Button
              onClick={fetchFavorites}
              variant="contained"
              sx={{
                background: "#ff9800",
                color: "white",
                borderRadius: "25px",
                textTransform: "none",
                "&:hover": {
                  background: "#e08900",
                },
              }}
            >
              View Favorites
            </Button>
          )}
        </Box>

        {/* Recipe Grid */}
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          {(viewingFavorites ? favorites : recipes).map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image_url}
                  alt={recipe.title}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2">
                    ⭐ {recipe.rating} stars ({recipe.ratings_count} reviews)
                  </Typography>
                  <IconButton
                    onClick={() => toggleFavorite(recipe)}
                    sx={{ color: "yellow" }}
                  >
                    {favoriteIds.has(recipe.id) ? (
                      <StarIcon />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </IconButton>
                  <Button
                    variant="contained"
                    size="small"
                    href={recipe.link}
                    target="_blank"
                    sx={{ marginTop: 1, background: "#ff9800" }}
                  >
                    View Recipe
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
