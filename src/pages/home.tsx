import {
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
  useMediaQuery,
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
import getUserOutfits from "../api/dashboard/getUserOutfits";

const HomePage: React.FC = () => {
  const [outfits, setOutfits] = useState<ClothType[]>([]);
  const [clothes, setClothes] = useState<ClothType[]>([]);
  const [selectedCloth, setSelectedCloth] = useState<ClothType>();
  const [selectedOutfit, setSelectedOutfit] = useState<ClothType>();
  const [generatedImage, setGeneratedImage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        setLoading(true);
        const clothes = await getUserClothes();
        const outfits = await getUserOutfits();
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
      console.log(response);
      setGeneratedImage(response);
      setGenerating(false);
    } catch (e) {
      console.log(e);
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
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: pallete.secondary[900],
      }}
    >
      <Header />
      <Box
        sx={{
          width: "100%",
          flex: 1,
          margin: "auto",
          px: { xs: 1, sm: 2 },
          py: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 4 },
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            width: { xs: "90%", md: "60%" },
            display: "flex",
            flexDirection: "column",
            m: "auto",
            gap: 3,
          }}
        >
          {/* Outfits Section */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                flexWrap: "wrap",
                gap: 1,
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
                size="small"
                sx={{ whiteSpace: "nowrap" }}
              >
                استایل جدید
              </Button>
            </Box>
            <ClothSlider
              itemPerView={isMobile ? 1 : 3}
              clothes={outfits}
              loading={loading}
              selectedCloth={selectedOutfit}
              setselectedCloth={setSelectedOutfit}
            />
          </Box>

          {/* Clothes Section */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                flexWrap: "wrap",
                gap: 1,
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
                size="small"
                sx={{ whiteSpace: "nowrap" }}
              >
                لباس جدید
              </Button>
            </Box>
            <ClothSlider
              itemPerView={isMobile ? 1 : 3}
              clothes={clothes}
              loading={loading}
              selectedCloth={selectedCloth}
              setselectedCloth={setSelectedCloth}
            />
          </Box>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            width: isMobile ? "90%" : "100%",
            display: "flex",
            flexDirection: "column",
            m: "auto",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
              aspectRatio: "3/4",
              bgcolor: pallete.secondary[800],
            }}
          >
            {generating || !generatedImage ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            ) : (
              <img
                src={generatedImage}
                alt="Generated result"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
            )}
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleClick}
            disabled={generating}
            sx={{
              py: 1.5,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {generating ? (
              <CircularProgress
                size={24}
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
