import { Box } from "@mui/material";
import React from "react";

interface ClothesProps {
  image?: string | null;
  fadeIn: boolean;
}

const Cloth: React.FC<ClothesProps> = ({ image, fadeIn }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        position: "relative",
        transition: "opacity 0.2s ease-in-out",
        opacity: fadeIn ? 1 : 0,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: 120, sm: 160, md: 130, lg: 170, xl: 220 },
          height: { xs: 120, sm: 160, md: 130, lg: 170, xl: 220 },
          borderRadius: 3,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <img
          width="100%"
          height="100%"
          src={image ?? ""} // Use fallback if image is undefined
          alt={""}
          style={{
            transition: "transform 0.8s ease-in-out",
            transform: fadeIn ? "scale(1)" : "scale(0.95)",
          }}
        />
      </Box>
    </Box>
  );
};

export default Cloth;