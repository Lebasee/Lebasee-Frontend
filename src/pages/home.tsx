import { Box } from "@mui/material";
import { pallete } from "../styles/pallete.m";
import Header from "../components/home/header/header";

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
    </Box>
  );
};

export default HomePage;
