import { Box } from "@mui/material";
import React from "react";
import { pallete } from "../styles/pallete.m";
import Navbar from "../components/landing/navbar";
import HeroSection from "../components/landing/heroSection";
import Tutorial from "../components/landing/tutorial";
import Features from "../components/landing/features";

const Landing: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: `${pallete.secondary[900]}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Navbar />
      <HeroSection />
      <Tutorial />
      <Features />
    </Box>
  );
};

export default Landing;
