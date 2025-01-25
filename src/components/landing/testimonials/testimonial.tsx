import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { pallete } from "../../../styles/pallete.m";

interface TestimonialProps {
  name: string;
  text: string;
  image?: string;
  fadeIn: boolean;
}

// Testimonial.tsx
const Testimonial: React.FC<TestimonialProps> = ({
  name,
  text,
  image,
  fadeIn,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row-reverse" },
        alignItems: "center",
        gap: { xs: 3, md: 6 },
        p: 3,
        position: "relative",
        transition: "opacity 0.8s ease-in-out",
        opacity: fadeIn ? 1 : 0,
        mx: "auto",
        maxWidth: { md: "90%" },
      }}
    >
      {/* Decorative Circles */}
      {!isMobile && (
        <>
          <Box
            sx={{
              position: "absolute",
              width: { xs: 100, md: 150 },
              height: { xs: 100, md: 150 },
              borderRadius: "50%",
              bgcolor: pallete.primary[500],
              left: { md: 10 },
              top: { md: "50%" },
              transform: { md: "translateY(-50%)" },
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: { xs: 80, md: 100 },
              height: { xs: 80, md: 100 },
              borderRadius: "50%",
              bgcolor: "#BABABA",
              opacity: 0.3,
              left: { md: 150 },
              top: { md: "70%" },
              transform: { md: "translateY(-50%)" },
              zIndex: 2,
            }}
          />
        </>
      )}

      {/* User Image */}
      <Box
        sx={{
          position: "relative",
          width: { xs: 150, md: 210 },
          height: { xs: 150, md: 210 },
          minWidth: { xs: 150, md: 210 },
          borderRadius: "50%",
          overflow: "hidden",
          border: `5px solid ${pallete.primary[500]}`,
          zIndex: 1,
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Text Content */}
      <Box
        sx={{
          position: "relative",
          textAlign: { xs: "center", md: "right" },
          flex: 1,
        }}
      >
        <FormatQuoteIcon
          sx={{
            fontSize: { xs: 40, md: 80 },
            color: pallete.primary[500],
            position: "absolute",
            top: { xs: -30, md: -65 },
            right: { xs: -25 },
            opacity: 0.5,
          }}
        />

        <Typography
          variant="body1"
          color="white"
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
            lineHeight: 1.6,
            mb: 2,
            transition: "opacity 0.8s ease-in-out",
            opacity: fadeIn ? 1 : 0,
          }}
        >
          {text}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: pallete.primary[500],
            fontWeight: "bold",
            transition: "opacity 0.8s ease-in-out",
            opacity: fadeIn ? 1 : 0,
            textAlign: { xs: "center" },
            position: { md: "absolute" },
            left: { xs: 0 },
            bottom: { xs: -40 },
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default Testimonial;
