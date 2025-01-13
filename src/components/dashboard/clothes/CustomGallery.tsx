import { ImageListItem } from "@mui/material";
import CustomImageListBar from "./CustomImageListBar";
import { ClothType, ToastData } from "../../../types/types";
import { useState } from "react";

interface inputProps {
  clothes: ClothType[];
  setReloadImage: (value: boolean) => void; // Function that updates reload state
  setToastData: (data: ToastData) => void; // Function that updates toast data
  setIsLoading: (value: boolean) => void; // Function that updates loading state
}

const CustomGallery = ({
  clothes,
  setReloadImage,
  setToastData,
  setIsLoading,
}: inputProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {clothes.map((cloth: ClothType, index) => (
        <ImageListItem
          key={index}
          onMouseEnter={() => setHoveredIndex(index)} // Set hovered index
          onMouseLeave={() => setHoveredIndex(null)} // Clear hovered index
          sx={{
            position: "relative",
            overflow: "hidden", // Prevent overflow on hover
            borderRadius: 2, // Optional: Add rounded corners
            transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for scale and shadow
            transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)", // Slightly enlarge the hovered image
            boxShadow:
              hoveredIndex === index
                ? "0 8px 16px rgba(0, 0, 0, 0.3)" // Add shadow on hover
                : "none",
          }}
        >
          <img
            src={`${cloth.image}`}
            alt={"Image"}
            loading="lazy"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              transition: "transform 0.3s ease", // Smooth image zoom
            }}
          />

          {/* Show ImageListItemBar only for the hovered item */}
          {hoveredIndex === index && (
            <CustomImageListBar
              cloth={cloth}
              setReloadImage={setReloadImage}
              setToastData={setToastData}
              setIsLoading={setIsLoading}
            />
          )}
        </ImageListItem>
      ))}
    </>
  );
};

export default CustomGallery;
