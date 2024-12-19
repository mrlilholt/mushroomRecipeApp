import React from "react";
import { Box, Button } from "@mui/material";

const SearchBar = ({ mushroom, setMushroom, onSearch }) => {
  return (
    <Box sx={{ textAlign: "center", margin: 3 }}>
      <input
        type="text"
        value={mushroom}
        onChange={(e) => setMushroom(e.target.value)}
        placeholder="Search for mushrooms..."
        style={{ padding: "12px", borderRadius: "25px", width: "300px" }}
      />
      <Button onClick={onSearch} variant="contained" sx={{ marginLeft: 2 }}>Search</Button>
    </Box>
  );
};

export default SearchBar;
