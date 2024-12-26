import { Box, Grid, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import ModelViewer from "../../base/SketchfabEmbed";
import { pallete } from "../../../styles/pallete.m";
import { toPersianNumber } from "../../../utils/toPersianNumber";

interface Data {
  name: string;
  id: string;
  value: number;
  type: string;
  min: number;
  max: number;
}

const initialDatas: Data[] = [
  {
    name: "قد",
    id: "height",
    value: 155,
    type: "سانتی متر",
    min: 120,
    max: 210,
  },
  { name: "سن", id: "age", value: 20, type: "سال", min: 1, max: 100 },
  { name: "وزن", id: "weight", value: 90, type: "کیلوگرم", min: 30, max: 150 },
  {
    name: "عرض شانه",
    id: "shoulder_width",
    value: 50,
    type: "سانتی متر",
    min: 30,
    max: 80,
  },
  {
    name: "دور سینه",
    id: "chest_circumference",
    value: 50,
    type: "سانتی متر",
    min: 30,
    max: 100,
  },
  {
    name: "دور بازو",
    id: "arm_size",
    value: 20 ,
    type: "سانتی متر",
    min: 10,
    max: 80,
  },
];

const Information: React.FC = () => {
  const [datas, setDatas] = useState<Data[]>(initialDatas);

  const handleSliderChange = (id: string, newValue: number) => {
    setDatas((prevDatas) =>
      prevDatas.map((data) =>
        data.id === id ? { ...data, value: newValue } : data
      )
    );
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
      <Box // right part
        sx={{
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          mt: 16,
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h3"
          color="white"
          mb={4}
        >
          اطلاعات بدن شما
        </Typography>

        <Grid
          sx={{
            overflowX: "hidden",
            height: "calc(100vh - 20rem)",
            overflowY: "scroll", // Enable vertical scrolling
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar in WebKit browsers
            },
            "-ms-overflow-style": "none", // Hide scrollbar in IE and Edge
            "scrollbar-width": "none", // Hide scrollbar in Firefox
          }}
        >
          {datas.map((data) => (
            <Box
              sx={{
                mb: 3,
              }}
              key={data.id}
            >
              <Grid
                container
                spacing={2}
                alignItems="center"
              >
                <Grid
                  item
                  xs={6}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "30rem",
                    }}
                  >
                    <Typography color="white">{data.name}</Typography>
                    <Typography
                      noWrap
                      color="white"
                    >
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
                    } // Type assertion for newValue
                    sx={{
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
                      "& .MuiSlider-track": {
                        border: "none",
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "white",
                        opacity: 0.8,
                      },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                ></Grid>
              </Grid>
            </Box>
          ))}
        </Grid>
      </Box>

      <Box // left part
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
