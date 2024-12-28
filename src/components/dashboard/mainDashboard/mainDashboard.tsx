import { Box, Grid, Typography } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import ShowClothes from "./showClothes";
import ModelViewer from "../../base/SketchfabEmbed";
import { useEffect, useState } from "react";
import getUserBodyInformation from "../../../api/dashboard/getUserBodyInformation";


const datas = [
  { name: "قد", id: 1, value: "182", type: "سانتی متر" },
  { name: "سن", id: 1, value: "32", type: "سال" },
  { name: "وزن", id: 1, value: "73", type: "کیلوگرم" },
  { name: "عرض شانه", id: 1, value: "40", type: "سانتی متر" },
];

const MainDashboard: React.FC = () => {
  const [data, setDatas] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserBodyInformation();
        setDatas(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Box // right part
        sx={{
          width: "70%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Box // top right
          sx={{
            width: "100%",
            height: "45%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box // data box
            sx={{
              width: "50%",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mt: 7,
                mr: 3,
                color: "white",
              }}
            >
              بدن شما
            </Typography>

            <Box
              sx={{
                width: "100%",
                mt: 2,
                borderRadius: 2,
              }}
            >
              {datas.map((data) => (
                <Grid
                  container
                  spacing={2}
                  key={data.id}
                  sx={{ py: 1.5, borderBottom: "0px solid #555" }}
                >
                  <Grid item xs={5}>
                    <Typography align="center" color="white">
                      {data.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography
                      align="center"
                      color={pallete.primary[200]}
                      sx={{
                        ml: -20,
                      }}
                    >
                      {data.value}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align="center" color={pallete.primary[200]}>
                      {data.type}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Box>

          <Box // avatar shape part
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            {/* <div class="sketchfab-embed-wrapper"> <iframe title="Henry male Realistic 3d Models" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/278d5d98c5f1471e81596e5d14e2a31e/embed"> </iframe> <p style="font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;"> <a href="https://sketchfab.com/3d-models/henry-male-realistic-3d-models-278d5d98c5f1471e81596e5d14e2a31e?utm_medium=embed&utm_campaign=share-popup&utm_content=278d5d98c5f1471e81596e5d14e2a31e" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;"> Henry male Realistic 3d Models </a> by <a href="https://sketchfab.com/meshatrech?utm_medium=embed&utm_campaign=share-popup&utm_content=278d5d98c5f1471e81596e5d14e2a31e" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;"> Mesh Artech </a> on <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=278d5d98c5f1471e81596e5d14e2a31e" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;">Sketchfab</a></p></div> */}
            <Box
              sx={{
                mb: -12,
                height: "100%",
                width: "70%",
              }}
            >
              <ModelViewer />
            </Box>
            {/* <Avatar
              sx={{
                height: "70%",
                width: "70%",
                borderRadius: 2,
              }}
            ></Avatar> */}
          </Box>
        </Box>

        <Box // bottom right
          sx={{
            width: "100%",
            height: "45%",
          }}
        >
          <ShowClothes />
        </Box>
      </Box>

      <Box // left part
        sx={{
          width: "30%",
          height: "100%",
        }}
      ></Box>
    </Box>
  );
};

export default MainDashboard;