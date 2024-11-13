import { Box } from "@mui/material";
import React from "react";

interface ClothesProps {
  name: string;
  image?: string;
  fadeIn: boolean;
}

const Cloth: React.FC<ClothesProps> = ({
  name,
  image,
  fadeIn,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        position: "relative",
        transition: "opacity 0.8s ease-in-out",
        opacity: fadeIn ? 1 : 0,
      }}
    >

      <Box
        sx={{
          position: "relative",
          width: 300,
          height: 300,
          borderRadius: 3,
          overflow: "hidden",
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

    </Box>
  );
};

export default Cloth;