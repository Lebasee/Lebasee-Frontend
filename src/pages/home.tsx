import { Box, Button, Typography } from "@mui/material";
import { pallete } from "../styles/pallete.m";
import Header from "../components/home/header/header";
import ClothSlider from "../components/home/cloth/clothSlider";

const HomePage: React.FC = () => {
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
          maxWidth: "1126px",
          width: "100%",
          height: " 100%",
          margin: "auto",
          padding: "16px",
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
          <ClothSlider />
          {/* <ClothSlider /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
