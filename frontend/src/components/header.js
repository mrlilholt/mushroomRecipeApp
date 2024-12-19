import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Header = ({ user, onSignIn, onLogout }) => {
  return (
    <Box sx={{ textAlign: "center", padding: 2 }}>
      <img src="/mushroomLogo.png" alt="Mushroom Recipe Logo" style={{ width: "80px" }} />
      <Typography variant="h3" sx={{ color: "#fff", margin: 2 }}>Mushroom Recipe Finder</Typography>
      {user ? (
        <Box>
          <Typography variant="h6" sx={{ color: "#fff" }}>Welcome, {user.displayName}!</Typography>
          <Button onClick={onLogout} variant="outlined" sx={{ color: "#fff" }}>Logout</Button>
        </Box>
      ) : (
        <Button onClick={onSignIn} variant="contained" sx={{ background: "#6dd5ed", color: "#fff" }}>Sign in with Google</Button>
      )}
    </Box>
  );
};

export default Header;
