import {
  Box,
  Typography,
  Skeleton,
  ImageListItem,
  ImageList,
  useMediaQuery,
} from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import ShowClothes from "./showClothes";
import { useEffect, useRef, useState } from "react";
import getUserBodyInformationDashboard from "../../../api/dashboard/getUserBodyInformationDashboard";
import { BodyInformation, ClothType } from "../../../types/types";
import getUserOutfits from "../../../api/dashboard/getUserOutfits";

const MainDashboard: React.FC = () => {
  const [datas, setDatas] = useState<BodyInformation[]>([]);
  const [outfits, setOutfits] = useState<ClothType[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isSmallScreenY = useMediaQuery("(max-height: 750px)");
  const isLargeScreenY = useMediaQuery("(min-height: 1000px)");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response1 = await getUserBodyInformationDashboard();
        setDatas(response1);
        const response2 = await getUserOutfits();
        setOutfits(response2);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user information:", error);
        setLoading(false);
      }
    };
    fetchUserData();

    const scrollContainer = scrollContainerRef.current;

    const scrollImages = () => {
      if (scrollContainer) {
        if (
          scrollContainer.scrollTop >=
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        ) {
          scrollContainer.scrollTop = 0;
        } else {
          scrollContainer.scrollTop += 2;
        }
      }
    };
    const interval = setInterval(scrollImages, 30); // Adjust interval for smoothness
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "row",
        p: "25px",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Box // right part
        sx={{
          width: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Box // Top right container
          sx={{
            width: "100%",
            height: "45%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box // Data box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end", // Align "بدن شما" to the right
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  mt: isSmallScreenY ? 0 : 6,
                  mr: { xs: 1, md: 3 },
                  fontSize: isSmallScreenY
                    ? "1.2rem"
                    : { xs: "1.5rem", md: "2.5rem" },
                  color: "white",
                  textAlign: "right", // Ensure "بدن شما" stays right-aligned
                }}
              >
                بدن شما
              </Typography>

              <Box
                sx={{
                  width: { xs: "95%", sm: "80%" },
                  mt: 2,
                  borderRadius: 2,
                  mr: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap", // Ensure items wrap neatly
                  gap: isLargeScreenY ? 5 : 2, // Add space between grid items
                }}
              >
                {loading
                  ? [...Array(5)].map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="text"
                        sx={{
                          width: { xs: 140, sm: 170, md: 220, lg: 350 },
                          borderRadius: 3,
                        }}
                      />
                    ))
                  : datas.map((data) => (
                      <Box
                        key={data.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          minWidth: {
                            xs: "140px",
                            sm: "190px",
                            md: "290px",
                            lg: "390px",
                            xl: "540px",
                          },
                          borderBottom: "0px solid #555",
                          padding: "8px",
                          backgroundColor: "rgba(255, 255, 255, 0.1)", // Optional styling
                          borderRadius: "8px", // Optional styling
                        }}
                      >
                        <Typography
                          align="center"
                          color="white"
                          sx={{
                            fontSize: { xs: "0.75rem", md: "1rem" },
                          }}
                        >
                          {data.name}
                        </Typography>
                        <Typography
                          align="center"
                          color={pallete.primary[200]}
                          sx={{
                            fontSize: { xs: "0.75rem", md: "1rem" },
                          }}
                        >
                          {data.value}
                        </Typography>
                        <Typography
                          align="center"
                          color={pallete.primary[200]}
                          sx={{
                            fontSize: { xs: "0.75rem", md: "1rem" },
                          }}
                        >
                          {data.type}
                        </Typography>
                      </Box>
                    ))}
              </Box>
            </Box>
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
        ref={scrollContainerRef}
        sx={{
          width: "40%", // Adjust to your container width
          height: "90%", // Adjust to your desired height
          overflow: "hidden", // Hide scrollbars
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageList
          sx={{
            flexWrap: "nowrap", // Prevent wrapping
          }}
          cols={1} // Display one image per row
        >
          {loading
            ? // Show skeletons while loading
              [...Array(20)].map((_) => (
                <Skeleton
                  variant="rectangular"
                  sx={{
                    mt: 2,
                    width: "100%",
                    height: { xs: 150, md: 350 },
                    borderRadius: "10px",
                  }}
                />
              ))
            : // Show actual outfits when loaded
              [...outfits, ...outfits, ...outfits].map((outfit, index) => (
                <ImageListItem
                  key={index}
                  sx={{ height: "100px", width: "65%", mt: 2 }}
                >
                  <img
                    src={
                      outfit.image instanceof File
                        ? URL.createObjectURL(outfit.image) // Convert File to a URL
                        : outfit.image || "" // Use the string directly or fallback to an empty string
                    }
                    alt={`Image ${index + 1}`}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </ImageListItem>
              ))}
        </ImageList>
      </Box>
    </Box>
  );
};

export default MainDashboard;