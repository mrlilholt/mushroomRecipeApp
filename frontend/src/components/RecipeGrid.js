import React from "react";
import { Grid, Card, CardMedia, Typography, Button, Box } from "@mui/material";

const RecipeGrid = ({ recipes, onAddToFavorites }) => {
  return (
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
              <Button
                variant="contained"
                size="small"
                onClick={() => onAddToFavorites(recipe)}
                sx={{
                  marginTop: 1,
                  background: "#4caf50",
                  "&:hover": { background: "#45a047" },
                }}
              >
                Add to Favorites
              </Button>
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
  );
};

export default RecipeGrid;
