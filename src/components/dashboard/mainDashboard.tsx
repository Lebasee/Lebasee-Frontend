import { Avatar, Box, Grid, Typography } from "@mui/material";
import { pallete } from "../../styles/pallete.m";
import ShowClothes from "./showClothes";

const datas = [
  { name: "قد", id: 1, value: "182", type: "سانتی متر" },
  { name: "سن", id: 1, value: "32", type: "سال" },
  { name: "وزن", id: 1, value: "73", type: "کیلوگرم" },
  { name: "عرض شانه", id: 1, value: "40", type: "سانتی متر" },
];



const MainDashboard: React.FC = () => {

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
          height: '100%',
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
            <Avatar
              sx={{
                height: "70%",
                width: "70%",
                borderRadius: 2,
              }}
            ></Avatar>
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
          height: '100%',
        }}
      ></Box>
    </Box>
  );
};

export default MainDashboard;