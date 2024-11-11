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
        height: "330px",
        width: "330px",
        bgcolor: `${pallete.secondary[800]}`,
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        p: "20px 30px",
        boxShadow: `8px 8px 20px 0px`,
      }}
    >
      <Box
        sx={{
          height: "200px",
          width: "200px",
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
