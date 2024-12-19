import React from "react";
import { Box, Typography, Modal, Button, Grid } from "@mui/material";

const FavoritesModal = ({ open, onClose, favorites }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "white",
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Your Favorite Recipes
        </Typography>
        <Grid container spacing={2}>
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">{favorite.title}</Typography>
                  <Typography variant="body2" sx={{ my: 1 }}>
                    Category: {favorite.category || "Uncategorized"}
                  </Typography>
                  <Button
                    href={favorite.link}
                    target="_blank"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                  >
                    View Recipe
                  </Button>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
              No favorites added yet!
            </Typography>
          )}
        </Grid>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ mt: 3, display: "block", mx: "auto" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FavoritesModal;
