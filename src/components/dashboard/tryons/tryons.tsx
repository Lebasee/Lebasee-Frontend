import React, { useEffect, useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { ClothType, ToastData } from "../../../types/types";
import Toast from "../../base/toast";
import FullScreenLoader from "../../base/FullScreenLoader";
import CustomGallery from "../clothes/CustomGallery";
import getUserTryons from "../../../api/dashboard/getUserTry";
import { pallete } from "../../../styles/pallete.m";

const Tryons: React.FC = () => {
  const [tryons, setTryons] = useState<ClothType[]>([]);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [reloadImage, setReloadImage] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        if (!firstLoading) {
          setIsLoading(true);
        }
        const fetchedTryons = await getUserTryons();
        setTryons(
          fetchedTryons.map((cloth: ClothType) => ({
            id: cloth.id,
            image: cloth.image,
            caption: cloth.caption,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch tryons", error);
      } finally {
        setIsLoading(false);
        setFirstLoading(false);
        setReloadImage(false);
      }
    };

    fetchClothes();
  }, [reloadImage]);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const isLargeScreen = useMediaQuery("(max-width:1260px)");

  const getCols = () => {
    if (isSmallScreen) return 1;
    if (isMediumScreen) return 2;
    if (isLargeScreen) return 3;
    return 4;
  };

  return (
    <Box
      sx={{
        flexDirection: "column",
        width: "100%",
        p: "25px",
        height: "100vh",
        alignItems: "center",
        overflowY: "auto", // Enables vertical scrolling
        scrollbarWidth: "thin", // For Firefox (optional)
        "&::-webkit-scrollbar": {
          width: "8px", // Width of the scrollbar
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: pallete.primary[300], // Scrollbar thumb color
          borderRadius: "10px", // Rounded corners for the thumb
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent", // Track color
        },
      }}
    >
      <Toast
        message={toastData.message}
        open={toastData.open}
        severity={toastData.severity}
        onClose={() => setToastData({ ...toastData, open: false })}
      />

      {isLoading && <FullScreenLoader />}

      {firstLoading ? (
        <ImageList
          cols={getCols()}
          gap={16}
        >
          {Array.from({ length: 24 }).map((_, index) => (
            <ImageListItem key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                sx={{ mt: 1 }}
              />
              <Skeleton
                variant="text"
                width="40%"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <ImageList
          cols={getCols()}
          gap={16}
          sx={{
            cursor: "pointer",
            p: 2,
            overflow: "hidden",
          }}
        >
          <CustomGallery
            clothes={tryons}
            setReloadImage={setReloadImage}
            setToastData={setToastData}
            setIsLoading={setIsLoading}
          />
        </ImageList>
      )}
    </Box>
  );
};

export default Tryons;
