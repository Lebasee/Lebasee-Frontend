import {
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import { pallete } from "../styles/pallete.m";
import Header from "../components/home/header/header";
import ClothSlider from "../components/home/cloth/clothSlider";
import { useEffect, useState } from "react";
import getUserClothes from "../api/dashboard/getUserClothes";
import { ClothType, generatedImage, ToastData } from "../types/types";
import Toast from "../components/base/toast";
import { AxiosError } from "axios";
import tryon from "../api/home/tryon";

const HomePage: React.FC = () => {
  const [outfits, setOutfits] = useState<ClothType[]>([]);
  const [clothes, setClothes] = useState<ClothType[]>([]);
  const [selectedCloth, setSelectedCloth] = useState<ClothType>();
  const [selectedOutfit, setSelectedOutfit] = useState<ClothType>();
  const [generatedImage, setGeneratedImage] = useState<generatedImage>();
  const [loading, setLoading] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        setLoading(true);
        const response = await getUserClothes();
        const outfits = response.filter((cloth) => cloth.is_outfit);
        const clothes = response.filter((cloth) => !cloth.is_outfit);
        setOutfits(outfits);
        setClothes(clothes);
        setLoading(false);
      } catch (e) {
        const axoiosError = e as AxiosError;
        if (axoiosError.status === 401) {
          setToastData({
            open: true,
            message: "نشست شما منقضی شده است. لطفا دوباره وارد شوید.",
            severity: "error",
          });
          setTimeout(() => {
            window.location.href = "auth/login";
          }, 3000);
        } else {
          setToastData({
            open: true,
            message: "خطا در برقراری ارتباط با سرور.",
            severity: "error",
          });
        }
      }
    };
    fetchClothes();
  }, []);

  const handleClick = async () => {
    if (!selectedCloth || !selectedOutfit) {
      setToastData({
        open: true,
        message: "ابتدا یک لباس و استایل انتخب کنید.",
        severity: "warning",
      });
      return;
    }
    try {
      const data: generatedImage = {
        human_image_url: selectedOutfit.image as string,
        garment_image_url: selectedCloth.image as string,
      };
      setGenerating(true);
      const response = await tryon(data);
      setGeneratedImage(response);
      setGenerating(false);
    } catch (e) {
      setGenerating(false);
      setToastData({
        open: true,
        message: "خطا در تولید عکس لطفا مجددا سعی کنید.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
        overflow: "hidden",
        backgroundColor: pallete.secondary[900],
      }}
    >
      <Header />
      <Box
        sx={{
          maxWidth: "1226px",
          width: "100%",
          height: " 100%",
          margin: "auto",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "60%", height: " 100%", p: "2rem 0" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "1rem",
            }}
          >
            <Typography
              variant="h5"
              color="white"
            >
              استایل های شما
            </Typography>
            <Button
              variant="outlined"
              href="/dashboard/styles"
            >
              استایل جدید
            </Button>
          </Box>
          <ClothSlider
            clothes={outfits}
            loading={loading}
            selectedCloth={selectedOutfit}
            setselectedCloth={setSelectedOutfit}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "1rem",
              mt: "2rem",
            }}
          >
            <Typography
              variant="h5"
              color="white"
            >
              لباس های شما
            </Typography>
            <Button
              variant="outlined"
              href="/dashboard/clothes"
            >
              لباس جدید
            </Button>
          </Box>
          <ClothSlider
            clothes={clothes}
            loading={loading}
            selectedCloth={selectedCloth}
            setselectedCloth={setSelectedCloth}
          />
        </Box>
        <Box
          sx={{
            width: "35%",
            height: " 100%",
            p: "2rem 0",
          }}
        >
          <Box
            sx={{
              width: "100%",
              minHeight: 500,
              borderRadius: "8px",
            }}
          >
            {generating || !generatedImage ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="500px"
                animation="wave"
                sx={{ borderRadius: "8px", bgcolor: pallete.secondary[800] }}
              />
            ) : (
              <img
                src={generatedImage?.human_image_url}
                alt={generatedImage?.description}
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                loading="lazy"
              />
            )}
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: "10px" }}
            onClick={handleClick}
          >
            {generating ? (
              <CircularProgress
                size="32.5px"
                sx={{ color: "#ffffff" }}
              />
            ) : (
              "پرو مجازی"
            )}
          </Button>
        </Box>
      </Box>
      <Toast
        message={toastData.message}
        open={toastData.open}
        severity={toastData.severity}
        onClose={() => setToastData({ ...toastData, open: false })}
      />
    </Box>
  );
};

export default HomePage;
