import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function Header({ user, onSignIn, onLogout }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e3c72", padding: "0 16px" }}>
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {/* Left: Title and Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src="/mushroomLogo.png"
            alt="Logo"
            style={{ height: "40px", width: "auto" }}
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

        {/* Right: Login/Favorites Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
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
              <Avatar
                src={user.photoURL}
                alt={user.displayName}
                sx={{ width: 30, height: 30 }}
              />
              <Button
                onClick={onLogout}
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
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
