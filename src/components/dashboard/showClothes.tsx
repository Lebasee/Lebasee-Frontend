import { Box, Typography } from "@mui/material";
import { pallete } from "../../styles/pallete.m";
import { useEffect, useState } from "react";
import Tshirt_1 from "../../assets/Tshirt-1.png";
import Tshirt_2 from "../../assets/Tshirt-2.png";
import Tshirt_3 from "../../assets/Tshirt-3.png";
import Cloth from "./cloth";

const clothes = [
  { name: "T-shirt", image: Tshirt_1, id: 1 },
  { name: "T-shirt", image: Tshirt_2, id: 2 },
  { name: "T-shirt", image: Tshirt_3, id: 3 },
  { name: "T-shirt", image: Tshirt_2, id: 4 },
  { name: "T-shirt", image: Tshirt_1, id: 5 },
  { name: "T-shirt", image: Tshirt_3, id: 6 },
  { name: "T-shirt", image: Tshirt_3, id: 7 },
];

const ShowClothes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clothes.length);
        setFadeIn(true);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFadeIn(true);
    }, 800);
  };

  const getNextIndex = (index: number) => (index + 1) % clothes.length;

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
        {/* First image */}
        <Cloth
          name={clothes[currentIndex].name}
          image={clothes[currentIndex].image}
          fadeIn={fadeIn}
        />
        
        {/* Second image */}
        <Cloth
          name={clothes[getNextIndex(currentIndex)].name}
          image={clothes[getNextIndex(currentIndex)].image}
          fadeIn={fadeIn}
        />
        {/* Second image */}
        <Cloth
          name={clothes[getNextIndex(getNextIndex(currentIndex))].name}
          image={clothes[getNextIndex(getNextIndex(currentIndex))].image}
          fadeIn={fadeIn}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          gap: "8px",
        }}
      >
        {clothes.map((_, index) => (
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
