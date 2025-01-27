import { Box, Typography, Skeleton, Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Cloth from "./cloth";
import getUserClothes from "../../../api/dashboard/getUserClothes";
import { ClothType } from "../../../types/types";

const ShowClothes: React.FC = () => {
  const currentIndex = 0;
  const [loading, setLoading] = useState<boolean>(true);
  const [clothes, setClothes] = useState<ClothType[]>([]);
  const hasFetchedData = useRef(false); // Ensure fetchUserData runs only once

  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  const isMediumScreen = useMediaQuery("(min-width: 1256px");
  const isSmallScreenY = useMediaQuery("(max-height: 600px)");

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
  }, [clothes.length]);

  const currentClothes = clothes.slice(
    currentIndex,
    currentIndex + (isSmallScreen ? 2 : 3)
  );
  const displayClothes =
    currentClothes.length < (isSmallScreen ? 2 : 3)
      ? [
          ...currentClothes,
          ...clothes.slice(0, (isSmallScreen ? 2 : 3) - currentClothes.length),
        ]
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
      }}
    >
      <Typography
        color="white"
        variant="h3"
        sx={{
          mr: { xs: 1, md: 3 },
          textAlign: "right",
          width: "100%",
          fontSize: isSmallScreenY ? "1.2rem" : { xs: "1.5rem", md: "2.5rem" },
        }}
      >
        لباس‌های شما
      </Typography>
      <Grid
        container
        spacing={isMediumScreen ? 3 : 2}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
          mt: 1,
        }}
      >
        {/* Show skeleton loader or loaded clothes */}
        {loading
          ? Array.from({ length: isSmallScreen ? 2 : 3 }).map((_, index) => (
              <Grid
                item
                key={index}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: { xs: 120, sm: 160, md: 130, lg: 170, xl: 220 },
                    height: { xs: 120, sm: 160, md: 130, lg: 170, xl: 220 },
                    borderRadius: 3,
                  }}
                />
              </Grid>
            ))
          : displayClothes.map((cloth, index) => (
              <Grid
                item
                key={index}
              >
                <Cloth
                  image={cloth.image as string | undefined}
                  fadeIn={true}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default ShowClothes;