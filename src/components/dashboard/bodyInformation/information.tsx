import React, { useEffect, useState, useCallback } from "react";
import { Box, Grid, Slider, Typography } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import { toPersianNumber } from "../../../utils/toPersianNumber";
import getUserBodyInformation from "../../../api/dashboard/getUserBodyInformation";
import patchUserBodyInformation from "../../../api/dashboard/patchUserBodyInformation";
import { BodyInformation, ToastData } from "../../../types/types";
import { AxiosError } from "axios";
import Toast from "../../base/toast";
import { useNavigate } from "react-router-dom";
import ModelViewer from "../../base/SketchfabEmbed";
import debounce from "lodash.debounce"; // Install lodash if not already
``
const Information: React.FC = () => {
  const [datas, setDatas] = useState<BodyInformation[]>([]);
  const navigate = useNavigate();
  const [toastData, setToastData] = useState<ToastData>({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    const fetchUserData = async () => {
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
    // Update the local state immediately
    setDatas((prevDatas) =>
      prevDatas.map((data) =>
        data.id === id ? { ...data, value: newValue } : data
      )
    );

    // Trigger the debounced API call
    debouncedApiCall(id, newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          mt: 16,
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" color="white" mb={4}>
          اطلاعات بدن شما
        </Typography>

        <Grid
          sx={{
            overflowX: "hidden",
            height: "calc(100vh - 20rem)",
            overflowY: "scroll",
            "&::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          <Toast
            message={toastData.message}
            open={toastData.open}
            severity={toastData.severity}
            onClose={() => setToastData({ ...toastData, open: false })}
          />
          {datas.map((data) => (
            <Box key={data.id} sx={{ mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "30rem",
                    }}
                  >
                    <Typography color="white">{data.name}</Typography>
                    <Typography noWrap color="white">
                      {toPersianNumber(data.value)} {data.type}
                    </Typography>
                  </Box>
                  <Slider
                    value={data.value}
                    min={data.min}
                    max={data.max}
                    step={1}
                    onChange={(_, newValue) =>
                      handleSliderChange(data.id, newValue as number)
                    }
                    sx={{
                      mr: 2,
                      color: pallete.primary[400],
                      width: "30rem",
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

      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "90%",
            width: "70%",
          }}
        >
          <ModelViewer />
        </Box>
      </Box>
    </Box>
  );
};

export default Information;