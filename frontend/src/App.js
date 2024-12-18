import React, { useState } from "react";
import axios from "axios";
import { Box, Card, CardMedia, Typography, Grid, Button } from "@mui/material";

function App() {
  const [mushroom, setMushroom] = useState("");
  const [recipes, setRecipes] = useState([]);

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

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #1e3c72, #2a5298)",
        minHeight: "100vh",
        padding: 3,
        color: "white",
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 1 }}>
        <img
          src="/mushroomLogo.png" // Start with '/'
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
    fontWeight: 400, // Regular weight
    color: "#fff",
  }}
>
  Mushroom Recipe Finder
</Typography>

      {/* Search Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
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
            marginRight: "10px",
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
      </Box>

      {/* Recipe Grid */}
     <Grid container spacing={3} sx={{ marginTop: 3 }}>
  {recipes.map((recipe, index) => (
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
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)"
          }
        }}
      >
        {/* Background Image */}
        <CardMedia
          component="img"
          height="200"
          image={recipe.image_url}
          alt={recipe.title}
        />
        {/* Overlaying Text */}
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
  );
}

export default App;
