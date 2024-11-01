import React from "react";
import { Box, Typography } from "@mui/material";
import { pallete } from "../../styles/pallete.m";

interface featureProps {
  //   img?: I;
  text: String;
}

const Feature: React.FC<featureProps> = ({ text }) => {
  return (
    <Box
      sx={{
        height: "300px",
        width: "300px",
        bgcolor: `${pallete.secondary[800]}`,
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: "30px",
        gap: "40px",
      }}
    >
      <Box
        sx={{
          height: "144px",
          width: "144px",
          bgcolor: `${pallete.secondary[50]}`,
          borderRadius: "6px",
        }}
      ></Box>
      <Typography
        textAlign="center"
        color="white"
        variant="body1"
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Feature;
