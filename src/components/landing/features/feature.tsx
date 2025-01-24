import React from "react";
import { Box, Typography } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";

interface featureProps {
  //   img?: I;
  text: String;
}

const Feature: React.FC<featureProps> = ({ text }) => {
  return (
    <Box
      sx={{
        height: { xs: 280, md: 330 },
        width: { xs: "100%", md: 330 },
        maxWidth: 330,
        bgcolor: pallete.secondary[800],
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        p: { xs: 2, md: "20px 30px" },
        boxShadow: 8,
      }}
    >
      <Box
        sx={{
          height: { xs: 200, md: 200 },
          width: { xs: "80%", md: 200 },
          bgcolor: pallete.secondary[50],
          borderRadius: "6px",
        }}
      ></Box>
      <Typography
        textAlign="center"
        color="white"
        sx={{
          fontSize: { xs: "0.875rem", md: "1rem" },
          px: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Feature;
