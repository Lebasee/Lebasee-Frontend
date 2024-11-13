import { Box } from "@mui/material";
import React from "react";
import { pallete } from "../../styles/pallete.m";

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: "4px",              // Thickness of the vertical line
        height: "calc(100vh - 70px)", // Full height minus top and bottom margin (20px + 20px = 40px)
        backgroundColor: pallete.primary[200],    // Red color for the line
      }}
    />
  );
};

export default Sidebar;