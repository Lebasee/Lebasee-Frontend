import { Box, Typography } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import { useEffect, useState } from "react";
import Cloth from "./cloth";
import getUserClothes from "../../../api/dashboard/getUserClothes";

// Define the Clothes interface
interface Clothes {
  id: number;
  image?: string;
  caption?: string;
}

const ShowClothes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [clothes, setClothes] = useState<Clothes[]>([]); // Initialize with empty array

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserClothes();
        setClothes(response);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDotClick = (index: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFadeIn(true);
    }, 800);
  };

  const getNextIndex = (index: number) => (index + 1) % clothes.length;

  // Ensure clothes is not empty before rendering
  if (clothes.length === 0) {
    return <Typography></Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: "1063px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
      }}
    >
      <Typography
        color="white"
        variant="h3"
        sx={{
          mr: 6,
          textAlign: "right", // Align the text to the right
          width: "100%", // Ensures the full width of the parent container is used
        }}
      >
        لباس های شما
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: "50px", // Space between the two images
        }}
      >
        {/* Check if clothes is available before rendering */}
        {clothes.length > 0 && (
          <>
            <Cloth
              caption={clothes[currentIndex % clothes.length].caption}
              image={clothes[currentIndex % clothes.length].image}
              fadeIn={fadeIn}
            />
            <Cloth
              caption={clothes[getNextIndex(currentIndex) % clothes.length].caption}
              image={clothes[getNextIndex(currentIndex) % clothes.length].image}
              fadeIn={fadeIn}
            />
            <Cloth
              caption={
                clothes[getNextIndex(getNextIndex(currentIndex)) % clothes.length]
                  .caption
              }
              image={
                clothes[getNextIndex(getNextIndex(currentIndex)) % clothes.length]
                  .image
              }
              fadeIn={fadeIn}
            />
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          gap: "8px",
        }}
      >
        {clothes.length > 0 &&
          clothes.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Show item ${index + 1}`}
              sx={{
                width: index === currentIndex ? "40px" : "12px",
                height: "12px",
                borderRadius: index === currentIndex ? "6px" : "50%",
                backgroundColor:
                  index === currentIndex ? pallete.primary[500] : "#ddd",
                cursor: "pointer",
                transition: "width 0.3s ",
              }}
            />
          ))}
      </Box>
    </Box>
  );
};

export default ShowClothes;