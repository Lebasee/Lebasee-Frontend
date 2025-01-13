import { Box, Button, Typography } from "@mui/material";
import { pallete } from "../styles/pallete.m";
import Header from "../components/home/header/header";
import ClothSlider from "../components/home/cloth/clothSlider";
import { useEffect, useState } from "react";
import getUserClothes from "../api/dashboard/getUserClothes";
import { ClothType, ToastData } from "../types/types";
import Toast from "../components/base/toast";
import { AxiosError } from "axios";

const HomePage: React.FC = () => {
  const [outfits, setOutfits] = useState<ClothType[]>([]);
  const [clothes, setClothes] = useState<ClothType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
          />
        </Box>
        <Box
          sx={{ width: "30%", height: " 100%", p: "2rem 0", bgcolor: "red" }}
        >
          cscdc
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
