import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { pallete } from "../styles/pallete.m";
import CustomTextField from "../components/base/CustomTextField";
import { toPersianNumber } from "../utils/toPersianNumber";
import PictureInput from "../components/base/pictureInput";

const cloths = [
  {
    index: 0,
    type: "پیراهن",
    description: "",
    image: "",
  },
  {
    index: 1,
    type: "شلوار",
    description: "",
    image: "",
  },
  {
    index: 2,
    type: "کت",
    description: "",
    image: "",
  },
  {
    index: 3,
    type: "کفش",
    description: "",
    image: "",
  },
];

const HomePage: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [ismodealOpen, setIsmodalOpen] = useState(false);
  const [clothsState, setClothsState] = useState(cloths);

  const handleImageConfirm = (imageFile: string) => {
    const newCloths = [...clothsState];
    newCloths[index] = {
      ...newCloths[index],
      image: imageFile,
    };
    setClothsState(newCloths);
    setIsmodalOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: pallete.primary[500],
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          لباسی
        </Typography>
        <Avatar alt="Sajad" />
      </Box>

      {/* Main Content */}
      <Box
        flex={1}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          نمایش مدل
        </Typography>
      </Box>

      {/* Collapsible Section */}
      <Box>
        <Accordion
          sx={{
            bgcolor: pallete.secondary[900],
            "&:first-of-type": {
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            },
            "&:last-of-type": {
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            },
            "& .MuiAccordionDetails-root": {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            },
          }}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            expandIcon={<ExpandLessIcon sx={{ color: "#ffffff" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              "& .MuiAccordionSummary-content": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              },
            }}
          >
            <IconButton
              disabled={index === cloths.length - 1}
              onClick={(e) => {
                e.stopPropagation();
                setIndex((index + 1) % cloths.length);
              }}
            >
              <EastIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            <Typography sx={{ color: "#ffffff" }}>
              {toPersianNumber(cloths.length + " / " + (index + 1))}
              {"  "}
              {cloths[index].type}
            </Typography>
            <IconButton
              disabled={index === 0}
              onClick={(e) => {
                e.stopPropagation();
                setIndex((index - 1) % cloths.length);
              }}
            >
              <WestIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                width: "215px",
                height: "215px",
                borderRadius: "6px",
                bgcolor: pallete.secondary[200],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomTextField
                multiline
                rows={6}
                label="توضیحات"
                sx={{
                  "& .MuiInputBase-input-MuiOutlinedInput-input": {
                    width: "95%",
                  },
                }}
              />
            </Box>
            <Box
              onClick={() => setIsmodalOpen(true)}
              sx={{
                width: "215px",
                height: "215px",
                bgcolor: pallete.primary[500],
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              {clothsState[index].image ? (
                <img
                  src={clothsState[index].image}
                  alt="Preview"
                  style={{
                    borderRadius: "6px",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <>
                  <AddPhotoAlternateIcon sx={{ color: "#FFFFFF" }} />
                  <Typography
                    variant="body1"
                    sx={{ color: "#ffffff" }}
                  >
                    افزودن تصویر
                  </Typography>
                </>
              )}
            </Box>
            <Box
              sx={{
                position: "absolute",
                left: "calc(50% - 273px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton>
                <CheckCircleIcon sx={{ color: "#FFFFFF" }} />
              </IconButton>
              <IconButton>
                <CancelIcon sx={{ color: "#FFFFFF" }} />
              </IconButton>
            </Box>
            <PictureInput
              open={ismodealOpen}
              onClose={() => {
                setIsmodalOpen(false);
              }}
              onConfirm={handleImageConfirm}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default HomePage;
