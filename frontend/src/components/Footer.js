import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ background: "#000", padding: 2, textAlign: "center", color: "#fff" }}>
      <Typography>&copy; {new Date().getFullYear()} Mushroom Recipe Finder</Typography>
    </Box>
  );
};

export default Footer;
