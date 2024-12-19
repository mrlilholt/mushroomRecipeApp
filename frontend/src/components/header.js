import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function Header({ user, onSignIn, onLogout }) {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (user) {
      // Hide the welcome message after 4 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [user]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e3c72", padding: "0 16px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Center Section: Logo and Title */}
        <Box sx={{ textAlign: "center", flex: 2 }}>
          <img
            src="/mushroomLogo.png"
            alt="Logo"
            style={{ height: "40px", width: "auto", marginBottom: "8px" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "white",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
            }}
          >
            Mushroom Recipe Finder
          </Typography>
        </Box>

        {/* Right Section: Login/Logout and Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              {/* Conditional Welcome Message */}
              {showWelcome && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Welcome, {user.displayName}
                </Typography>
              )}
              <Avatar
                src={user.photoURL}
                alt={user.displayName}
                sx={{
                  width: 30,
                  height: 30,
                  border: "1px solid white",
                }}
              />
              <Button
                onClick={onLogout}
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  textTransform: "none",
                  fontSize: "12px",
                  padding: "4px 8px",
                  minWidth: "50px",
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={onSignIn}
              startIcon={<GoogleIcon />}
              sx={{
                backgroundColor: "white",
                color: "black",
                textTransform: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
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
