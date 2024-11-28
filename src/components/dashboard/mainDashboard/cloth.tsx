import { Box } from "@mui/material";
import React from "react";
import x from "../../../assets/Tshirt-1.png";

interface ClothesProps {
  name: string;
  image?: string;
  fadeIn: boolean;
}

const Cloth: React.FC<ClothesProps> = ({ name, image, fadeIn }) => {
  // Use a fallback image if the image is undefined
  const fallbackImage = x; // Put your fallback image path here

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
          width: 230,
          height: 230,
          borderRadius: 3,
          overflow: "hidden",
          zIndex: 1,
          // bgcolor: 'blue',
        }}
      >
        <img
          width="100%"
          height="100%"
          src={image || fallbackImage} // Use fallback if image is undefined
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