import { Box, Typography, Skeleton } from "@mui/material";
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
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [clothes.length]);

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
          textAlign: "right",
          width: "100%",
        }}
      >
        لباس‌های شما
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: "50px",
        }}
      >
        {/* Show skeleton loader for each clothing item */}
        {loading ? (
          <>
            <Skeleton
              variant="rectangular"
              width={230}
              height={230}
              sx={{ borderRadius: 3 }}
            />
            <Skeleton
              variant="rectangular"
              width={230}
              height={230}
              sx={{ borderRadius: 3 }}
            />
            <Skeleton
              variant="rectangular"
              width={230}
              height={230}
              sx={{ borderRadius: 3 }}
            />
          </>
        ) : (
          <>
            <Cloth
              image={clothes[currentIndex]?.image as string | undefined}
              fadeIn={fadeIn}
            />
            <Cloth
              image={
                clothes[getNextIndex(currentIndex)]?.image as string | undefined
              }
              fadeIn={fadeIn}
            />
            <Cloth
              image={
                clothes[getNextIndex(getNextIndex(currentIndex))]?.image as
                  | string
                  | undefined
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