import { Box, CircularProgress } from "@mui/material";
import { pallete } from "../../styles/pallete.m";

const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300, // Ensure it's above other components
      }}
    >
      <CircularProgress size={80} sx={{ color: pallete.primary[500] }} />
    </Box>
  );
};

export default FullScreenLoader;