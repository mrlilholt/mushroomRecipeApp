import React, { useState } from "react";
import axios from "axios";
import { Box, Card, CardMedia, Typography, Grid, Button } from "@mui/material";
import { db, signInWithGoogle } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [mushroom, setMushroom] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);

  // Handle Google Sign-In
  const handleSignIn = async () => {
    const signedInUser = await signInWithGoogle();
    if (signedInUser) {
      setUser(signedInUser);
      alert(`Welcome, ${signedInUser.displayName}!`);
    }
  };

  // Fetch recipes
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://mushroomrecipe.onrender.com/search?mushroom=${mushroom}`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Save favorite recipe
  const saveFavorite = async (recipe) => {
    if (!user) {
      alert("You need to sign in to save favorites!");
      return;
    }
    try {
      const favoritesRef = collection(db, "favorites");
      await addDoc(favoritesRef, { ...recipe, user: user.uid });
      alert("Recipe saved to favorites!");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <Box sx={{ padding: 3, color: "white" }}>
      {/* Sign-In Button */}
      {!user ? (
        <Button variant="contained" onClick={handleSignIn}>
          Sign in with Google
        </Button>
      ) : (
        <Typography>Welcome, {user.displayName}!</Typography>
      )}

      {/* Search Section */}
      <input
        type="text"
        placeholder="Search mushrooms..."
        value={mushroom}
        onChange={(e) => setMushroom(e.target.value)}
      />
      <Button onClick={fetchRecipes}>Search</Button>

      {/* Recipe Cards */}
      <Grid container spacing={2}>
        {recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia component="img" image={recipe.image_url} />
              <Typography>{recipe.title}</Typography>
              <Button onClick={() => saveFavorite(recipe)}>Save Favorite</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
