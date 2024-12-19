import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, Button } from "@mui/material";

function Header({ user, onSignIn, onLogout }) {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setShowWelcomeMessage(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1e3c72",
        padding: "0 16px", // Add padding for spacing
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title on the left side */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "bold",
            color: "white",
            textAlign: "left",
            paddingLeft: "16px", // Padding on the left
          }}
        >
          Mushroom Recipe Finder
        </Typography>

        {/* User Section on the right */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              {showWelcomeMessage && (
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
              )}
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
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                style={{ height: "20px", marginRight: "8px" }}
              />
              Sign in with Google
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
