import { Box, Typography, Skeleton, Grid, useMediaQuery } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import { useEffect, useState, useRef } from "react";
import Cloth from "./cloth";
import getUserClothes from "../../../api/dashboard/getUserClothes";
import { ClothType } from "../../../types/types";

const ShowClothes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState(true);
  const [clothes, setClothes] = useState<ClothType[]>([]);
  const hasFetchedData = useRef(false); // Ensure fetchUserData runs only once

  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isXSmallScreen = useMediaQuery("(max-width: 500px)");
  const isMediumScreen = useMediaQuery("(min-width: 1025px");
  const isLargeScreen = useMediaQuery("(min-width: 1460px)");

  const chunkArray = (arr: any[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const clothesChunks = chunkArray(clothes, isMediumScreen ? 3 : 4);

  // Fetch user clothes data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response: ClothType[] = await getUserClothes();
        setClothes(response);
      } catch (error) {
        console.error("Error fetching user clothes:", error);
      }
      setLoading(false);
    };

    if (!hasFetchedData.current) {
      fetchUserData();
      hasFetchedData.current = true;
    }

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clothes.length);
        setFadeIn(true);
      }, 800);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [clothes.length]);

  const handleDotClick = (index: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFadeIn(true);
    }, 800);
  };

  const currentClothes = clothes.slice(currentIndex, currentIndex + 3);
  const displayClothes =
    currentClothes.length < 3
      ? [...currentClothes, ...clothes.slice(0, 3 - currentClothes.length)]
      : currentClothes;

  return (
    <Box
      sx={{
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
          textAlign: "right",
          width: "100%",
        }}
      >
        لباس‌های شما
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Show skeleton loader or loaded clothes */}
        {loading
          ? Array.from({ length: isMediumScreen ? 3 : 4 }).map((_, index) => (
              <Grid
                item
                xs={6} // 2 items per row on small screens
                md={4} // 3 items per row on medium/large screens
                key={index}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: "100%",
                    aspectRatio: "1", // Ensures the skeletons are square
                    borderRadius: 3,
                  }}
                />
              </Grid>
            ))
          :
          displayClothes.map((cloth, index) => (
            <Grid
              item
              xs={12} // Full-width on small screens
              sm={6} // 2 items per row on medium screens
              md={4} // 3 items per row on large screens
              key={index}
            >
              <Cloth image={cloth.image as string | undefined} fadeIn={true} />
            </Grid>
          ))}
      </Grid>
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
              transition: "width 0.3s",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ShowClothes;