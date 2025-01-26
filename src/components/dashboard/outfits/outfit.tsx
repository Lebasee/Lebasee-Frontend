import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { ClothType, ToastData } from "../../../types/types";
import { pallete } from "../../../styles/pallete.m";
import AddIcon from "@mui/icons-material/Add";
import postUserCloth from "../../../api/dashboard/postUserCloth";
import "react-image-lightbox/style.css";
import Toast from "../../base/toast";
import FullScreenLoader from "../../base/FullScreenLoader";
import CustomGallery from "../clothes/CustomGallery";
import CustomImageListBar from "../clothes/CustomImageListBar";
import getUserOutfits from "../../../api/dashboard/getUserOutfits";

const Outfits: React.FC = () => {
  const [outfits, setOutfits] = useState<ClothType[]>([]);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [reloadImage, setReloadImage] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });
  const [newCloth, setNewCloth] = useState({
    caption: "",
    image: null as File | null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewCloth((prev) => ({ ...prev, image: file }));
    }
  };

  const handleAddCloth = async () => {
    setIsLoading(true);
    if (newCloth.image && newCloth.caption) {
      const formData = new FormData();
      formData.append("caption", newCloth.caption ?? "-");
      formData.append("image", newCloth.image);
      formData.append("is_outfit", "true");

      try {
        const response = await postUserCloth(formData);
        if (response?.status === 200 || response?.status === 201) {
          setReloadImage(true);
          setToastData({
            open: true,
            message: "لباس با موفقیت افزوده شد.",
            severity: "success",
          });
          setNewCloth({ caption: "", image: null });
        } else {
          throw new Error("Failed to upload");
        }
      } catch (error) {
        setToastData({
          open: true,
          message: "خطا در برقراری ارتباط با سرور.",
          severity: "error",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setToastData({
        open: true,
        message: "لطفا تصویر و توضیحات لباس را وارد کنید.",
        severity: "error",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        if (!firstLoading) {
          setIsLoading(true);
        }
        const fetchedClothes = await getUserOutfits();
        setOutfits(
          fetchedClothes.map((cloth: ClothType) => ({
            id: cloth.id,
            image: cloth.image,
            caption: cloth.caption,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch outfits", error);
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
        <ImageList cols={getCols()} gap={16}>
          {Array.from({ length: 8 }).map((_, index) => (
            <ImageListItem key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
              <Skeleton variant="text" width="40%" />
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
            clothes={outfits}
            setReloadImage={setReloadImage}
            setToastData={setToastData}
            setIsLoading={setIsLoading}
          />

          <ImageListItem
            sx={{
              position: "relative",
              height: "auto",
              width: "100%",
              overflow: "hidden",
              borderRadius: 2,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: !newCloth.image
                ? `2px dashed ${pallete.primary[400]}`
                : "",
            }}
          >
            {newCloth.image ? (
              <img src={URL.createObjectURL(newCloth.image)} alt="New cloth" />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                  }}
                >
                  افزودن استایل
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                  onChange={handleFileChange}
                />
                <AddIcon
                  sx={{
                    height: { sm: 100, md: 200, lg: 350 },
                    fontSize: 50,
                    color: "white",
                  }}
                />
              </Box>
            )}
            {newCloth.image && (
              <CustomImageListBar
                cloth={{
                  id: -1,
                  image: newCloth.image,
                  caption: "",
                }}
                setReloadImage={setReloadImage}
                setToastData={setToastData}
                setIsLoading={setIsLoading}
                setNewCloth={setNewCloth}
                fileInputRef={fileInputRef}
                handleAddCloth={handleAddCloth}
              />
            )}
          </ImageListItem>
        </ImageList>
      )}
    </Box>
  );
};

export default Outfits;