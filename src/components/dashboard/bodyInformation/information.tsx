import React, { useEffect, useState, useCallback } from "react";
import { Box, Grid, Skeleton, Slider, Typography } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import { toPersianNumber } from "../../../utils/toPersianNumber";
import getUserBodyInformation from "../../../api/dashboard/getUserBodyInformation";
import patchUserBodyInformation from "../../../api/dashboard/patchUserBodyInformation";
import { BodyInformation, ToastData } from "../../../types/types";
import { AxiosError } from "axios";
import Toast from "../../base/toast";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const Information: React.FC = () => {
  const [datas, setDatas] = useState<BodyInformation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await getUserBodyInformation();
        const formattedData = response.map((data: BodyInformation) => ({
          ...data,
          value: Number(data.value), // Ensure value is a number, fallback to min
        }));
        setDatas(formattedData);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.status === 401) {
          setToastData({
            open: true,
            message: "نشست شما منقضی شده است.",
            severity: "error",
          });
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate("/auth/login");
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          setToastData({
            open: true,
            message: "خطا در برقراری ارتباط با سرور.",
            severity: "error",
          });
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const debouncedApiCall = useCallback(
    debounce(async (id: string, newValue: number) => {
      try {
        const response = await patchUserBodyInformation({ id, newValue });
        const formattedData = response.map((data: BodyInformation) => ({
          ...data,
          value: Number(data.value),
        }));
        setDatas(formattedData);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.status === 401) {
          setToastData({
            open: true,
            message: "نشست شما منقضی شده است.",
            severity: "error",
          });
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate("/auth/login");
        } else {
          setToastData({
            open: true,
            message: "خطا در برقراری ارتباط با سرور.",
            severity: "error",
          });
        }
      }
    }, 500), // Debounce delay: 500ms
    []
  );

  const handleSliderChange = (id: string, newValue: number) => {
    setDatas((prevDatas) =>
      prevDatas.map((data) =>
        data.id === id ? { ...data, value: newValue } : data
      )
    );
    debouncedApiCall(id, newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "row",
        p: "25px",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          alignItems: "row",
          justifyContent: "flex-end",
          maxWidth: 1000,
          mx: "auto",
          p: 2,
          borderRadius: 2,
          overflowX: "hidden",
          overflowY: "auto", // Only show scrollbar when necessary
          position: "relative", // To control the scrollbar within the box
          "&::-webkit-scrollbar": {
            width: "8px", // Adjust scrollbar width
            display: "none", // Hide by default
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: pallete.primary[400], // Thumb color
            borderRadius: "8px", // Rounded corners for the thumb
            border: "3px solid transparent", // Border for the thumb (optional)
            backgroundClip: "content-box",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1", // Track color
            borderRadius: "8px", // Rounded corners for the track
          },
          "-ms-overflow-style": "none", // For Internet Explorer
        }}
      >
        <Typography variant="h3" color="white" mb={4}>
          اطلاعات بدن شما
        </Typography>

        <Grid
          sx={{
            height: "calc(100vh - 20rem)",
          }}
        >
          <Toast
            message={toastData.message}
            open={toastData.open}
            severity={toastData.severity}
            onClose={() => setToastData({ ...toastData, open: false })}
          />
          {loading &&
            [...Array(8)].map((_) => (
              <Skeleton
                variant="text"
                width="70%"
                sx={{
                  margin: "20px 80px",
                  borderRadius: 3,
                  mt: 4,
                  "@media (max-width: 600px)": {
                    width: "80%",
                    margin: "20px auto",
                  },
                }}
              />
            ))}
          {datas.map((data, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10} sm={8}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography color="white">{data.name}</Typography>
                    <Typography noWrap color="white">
                      {toPersianNumber(data.value ?? 0)} {data.type}
                    </Typography>
                  </Box>
                  <Slider
                    value={data.value ?? 0}
                    min={data.min ?? 0}
                    max={data.max ?? 1}
                    step={1}
                    onChange={(_, newValue) =>
                      handleSliderChange(data.id ?? "", newValue as number)
                    }
                    sx={{
                      mr: 2,
                      color: pallete.primary[400],
                      width: "100%", // Make the slider full width
                      "& .MuiSlider-thumb": {
                        height: 16,
                        width: 16,
                        "&:hover": {
                          boxShadow: "0px 0px 0px 8px rgba(25, 118, 210, 0.16)",
                        },
                        transform: "translateX(8px) translateY(-8px)",
                      },
                      "& .MuiSlider-track": { border: "none" },
                      "& .MuiSlider-rail": {
                        backgroundColor: "white",
                        opacity: 0.8,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Information;