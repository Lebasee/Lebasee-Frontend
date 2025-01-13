import { Box } from "@mui/material";
import React from "react";
import { pallete } from "../../../styles/pallete.m";

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: "4px",
        height: "calc(100vh - 70px)",
        backgroundColor: pallete.primary[200],
      }}
    />
  );
};

export default Sidebar;