import { Box, Typography } from "@mui/material";
import React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { pallete } from "../../../styles/pallete.m";

interface TestimonialProps {
  name: string;
  text: string;
  image?: string;
  fadeIn: boolean;
}

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  text,
  image,
  fadeIn,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        gap: 3,
        borderRadius: 4,
        padding: 3,
        position: "relative",
        transition: "opacity 0.8s ease-in-out",
        opacity: fadeIn ? 1 : 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor: `${pallete.primary[500]}`,
          left: 10,
          top: "32%",
          transform: "translateY(-50%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: "#BABABA",
          opacity: 0.3,
          left: 150,
          top: "70%",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      />

      <Box
        sx={{
          position: "relative",
          width: 210,
          height: 210,
          borderRadius: "50%",
          overflow: "hidden",
          border: `5px solid ${pallete.primary[500]}`,
          bgcolor: `${pallete.primary[500]}`,
          zIndex: 1,
        }}
      >
        <img
          width="100%"
          height="100%"
          src={image}
          alt={name}
          style={{
            transition: "transform 0.8s ease-in-out",
            transform: fadeIn ? "scale(1)" : "scale(0.95)",
          }}
        />
      </Box>

      <Box sx={{ flex: 1, textAlign: "right" }}>
        <FormatQuoteIcon
          sx={{
            fontSize: 80,
            color: `${pallete.primary[500]}`,
            position: "absolute",
            top: -15,
            right: -10,
          }}
        />
        <Typography
          variant="body1"
          color="white"
          sx={{
            transition: "opacity 0.8s ease-in-out",
            opacity: fadeIn ? 1 : 0,
          }}
        >
          {text}
        </Typography>
        <Typography
          sx={{
            position: "absolute",
            bottom: 40,
            left: 220,
            color: `${pallete.primary[500]}`,
            fontWeight: "bold",
            transition: "opacity 0.8s ease-in-out",
            opacity: fadeIn ? 1 : 0,
          }}
          variant="h6"
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default Testimonial;
