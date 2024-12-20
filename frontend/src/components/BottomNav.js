import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

function BottomNav({ onHomeClick, onFavoritesClick, onVideosClick }) {
    const [value, setValue] = React.useState(0);
  
    return (
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#1e3c72",
          zIndex: 10,
          boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.2)", // Shadow for better visibility
        }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (newValue === 0) onHomeClick();
            if (newValue === 1) onFavoritesClick();
            if (newValue === 2) onVideosClick();
          }}
          sx={{
            backgroundColor: "#1e3c72",
            color: "white",
            "& .Mui-selected": {
              color: "#6dd5ed",
            },
            height: "60px", // Set consistent height for the bar
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            sx={{
              color: "white",
              "& .Mui-selected": { color: "#6dd5ed" },
            }}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon />}
            sx={{
              color: "white",
              "& .Mui-selected": { color: "#6dd5ed" },
            }}
          />
          <BottomNavigationAction
            label="Videos"
            icon={<VideoLibraryIcon />}
            sx={{
              color: "white",
              "& .Mui-selected": { color: "#6dd5ed" },
            }}
          />
        </BottomNavigation>
      </Paper>
    );
  }  

export default BottomNav;
