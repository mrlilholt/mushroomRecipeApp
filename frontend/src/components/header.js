import React from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, Button } from "@mui/material";

function Header({ user, onSignIn, onLogout }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1e3c72",
        display: "flex",
        alignItems: "center", // Center items horizontally
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between", // Separate logo/title and user section
        }}
      >
        {/* Centered Logo and Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1, // Ensures it takes up the full center
          }}
        >
          <img
            src="/mushroomLogo.png"
            alt="Mushroom Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Mushroom Recipe Finder
          </Typography>
        </Box>

        {/* User Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Welcome, {user.displayName.split(" ")[0]}
              </Typography>
              <Avatar src={user.photoURL} alt={user.displayName} />
              <Button
                variant="outlined"
                onClick={onLogout}
                sx={{
                  color: "white",
                  borderColor: "white",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={onSignIn}
              sx={{
                backgroundColor: "white",
                color: "#1e3c72",
                fontFamily: "'Poppins', sans-serif",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              Sign in with Google
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
