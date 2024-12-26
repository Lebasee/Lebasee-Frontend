import { Box, IconButton, Typography } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface inputProps {
  name: string;
  description: string;
  image: string;
}

const Cloth = ({ name, description, image }: inputProps) => {
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => setDescriptionVisible(true)}
      onMouseLeave={() => setDescriptionVisible(false)}
    >
      <Box
        sx={{
          height: 266,
          maxWidth: descriptionVisible ? 150 : 0,
          bgcolor: pallete.primary[500],
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
          p: descriptionVisible ? 2 : 0,
          overflow: "hidden",
          transition: "max-width 0.5s ease-in-out",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            opacity: descriptionVisible ? 1 : 0,
            transition: `opacity 0.25s ease-in ${descriptionVisible && "0.3s"}`,
            wordWrap: "break-word",
          }}
        >
          <Typography
            variant="h5"
            color="#FFFFFF"
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            color="#FFFFFF"
          >
            {description}
          </Typography>
        </Box>
        <Box
          sx={{
            opacity: descriptionVisible ? 1 : 0,
            transition: `opacity 0.25s ease-in ${descriptionVisible && "0.3s"}`,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton>
            <EditIcon sx={{ color: "#FFFFFF" }} />
          </IconButton>
          <IconButton>
            <DeleteIcon sx={{ color: "#FFFFFF" }} />
          </IconButton>
        </Box>
      </Box>
      <img
        style={{
          height: 266,
          width: 270,
          backgroundColor: pallete.secondary[500],
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
          borderTopRightRadius: descriptionVisible ? 0 : 6,
          borderBottomRightRadius: descriptionVisible ? 0 : 6,
        }}
        src={image}
      />
    </Box>
  );
};

export default Cloth;
