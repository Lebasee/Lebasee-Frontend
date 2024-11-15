import { Avatar, Box, Grid, Slider, Typography } from "@mui/material";
import React, { useState } from "react";

// Define the data structure
interface Data {
  name: string;
  id: number; // Assuming id is a number as per initialDatas
  value: number;
  type: string;
  min: number;
  max: number;
}

const initialDatas: Data[] = [
  { name: "قد", id: 1, value: 182, type: "سانتی متر", min: 120, max: 210 },
  { name: "سن", id: 2, value: 32, type: "سال", min: 1, max: 100 },
  { name: "وزن", id: 3, value: 73, type: "کیلوگرم", min: 30, max: 150 },
  { name: "عرض شانه", id: 4, value: 40, type: "سانتی متر", min: 30, max: 80 },
];

const Information: React.FC = () => {
  const [datas, setDatas] = useState<Data[]>(initialDatas); // State with typed data array

  // Handler to update slider values with proper types
  const handleSliderChange = (id: number, newValue: number) => {
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
        <Typography variant="h3" color="white" mb={4}>
          اطلاعات بدن شما
        </Typography>

        {datas.map((data) => (
          <Box key={data.id} sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Typography color="white">{data.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Slider
                  value={data.value}
                  min={data.min}
                  max={data.max}
                  step={1}
                  onChange={(_, newValue) =>
                    handleSliderChange(data.id, newValue as number)
                  } // Type assertion for newValue
                  sx={{
                    color: "#1976d2",
                    "& .MuiSlider-thumb": {
                      height: 16,
                      width: 16,
                      "&:hover": {
                        boxShadow: "0px 0px 0px 8px rgba(25, 118, 210, 0.16)",
                      },
                    },
                    "& .MuiSlider-track": { border: "none" },
                    "& .MuiSlider-rail": { opacity: 0.3 },
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography
                  color="white"
                  sx={{
                    height: 28,
                    width: 30,
                  }}
                >
                  {data.value} {data.type}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
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
        <Avatar
          sx={{
            height: "76%",
            width: "75%",
            borderRadius: 2,
          }}
        >
          {/* Avatar content here, if needed */}
        </Avatar>
      </Box>
    </Box>
  );
};

export default Information;