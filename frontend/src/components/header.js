import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = ({ user, onSignIn, onLogout, onViewFavorites }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e3c72" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mushroom Recipe Finder
        </Typography>
        {user ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" onClick={onViewFavorites}>
              Favorites
            </Button>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={onSignIn}>
            Sign in with Google
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
