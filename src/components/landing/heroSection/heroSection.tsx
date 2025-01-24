import { Box, Button, Typography } from "@mui/material";
import React from "react";
// import { pallete } from "../../../styles/pallete.m";
import { useNavigate } from "react-router-dom";
import LoginImage from "../../../assets/LoginImage.png";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      data-testid="hero-section"
      sx={{
        mt: { xs: "95px", md: "105px" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: { xs: "450px", md: "550px" },
        px: { xs: 2, md: 0 },
        gap: { xs: 2, md: 1 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: { xs: 1, md: 4 },
        }}
      >
        <Typography
          variant="h1"
          color="white"
          sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
        >
          تجربه‌ای نوین در انتخاب لباس
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="white"
          sx={{ fontSize: { xs: "1rem", md: "1.125rem" } }}
        >
          لباس‌های خود را بر روی عکس دلخواه خود ببینید
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/auth/login")}
        >
          شروع کنید
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={LoginImage}
          alt="Login"
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
