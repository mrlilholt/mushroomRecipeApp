import React from "react";
import { Box, Button } from "@mui/material";

function SearchBar({ mushroom, setMushroom, onSearch }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "16px", // Adjust margin for higher placement
        gap: 2,
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
          border: "1px solid #ccc",
          width: "300px",
          backgroundColor: "#f9f9f9",
          fontSize: "16px",
          outline: "none",
        }}
      />
      <Button
        onClick={onSearch}
        variant="contained"
        sx={{
          backgroundColor: "#1e90ff",
          color: "white",
          borderRadius: "25px",
          textTransform: "none",
          padding: "10px 20px",
          "&:hover": {
            backgroundColor: "#1c86ee",
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;
