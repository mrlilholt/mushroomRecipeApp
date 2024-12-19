import React from "react";
import { Grid, Card, CardMedia, Box, Typography, Button } from "@mui/material";

const RecipeGrid = ({ recipes, onAddToFavorites }) => {
  return (
    <Grid container spacing={3}>
      {recipes.map((recipe, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ position: "relative" }}>
            <CardMedia component="img" image={recipe.image_url} alt={recipe.title} />
            <Box sx={{ position: "absolute", bottom: 0, padding: 2, background: "rgba(0,0,0,0.5)", color: "#fff" }}>
              <Typography variant="h6">{recipe.title}</Typography>
              <Button onClick={() => onAddToFavorites(recipe)}>Add to Favorites</Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeGrid;
