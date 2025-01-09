import {
  Box,
  Grid,
  Typography,
  Skeleton,
  ImageListItem,
  ImageList,
} from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import ShowClothes from "./showClothes";
import ModelViewer from "../../base/SketchfabEmbed";
import { useEffect, useRef, useState } from "react";
import getUserBodyInformationDashboard from "../../../api/dashboard/getUserBodyInformationDashboard";
import { BodyInformation, ClothType } from "../../../types/types";
// import image1 from "../../../assets/Tshirt-1.png";
// import image2 from "../../../assets/Tshirt-2.png";
// import img4 from "../../../assets/Tshirt-3.png";
import getUserOutfits from "../../../api/dashboard/getUserOutfits";

// const [outfits, setItems] = useState([
//   { title: "Item 1", image: image1 },
//   { title: "Item 1", image: image1 },
//   { title: "Item 1", image: image1 },
//   { title: "Item 2", image: image2 },
//   { title: "Item 3", image: img4 },
// ]);

const MainDashboard: React.FC = () => {
  const [datas, setDatas] = useState<BodyInformation[]>([]);
  const [outfits, setOutfits] = useState<ClothType[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    const interval = setInterval(scrollImages, 20); // Adjust interval for smoothness
    return () => clearInterval(interval);
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
              {loading
                ? [...Array(5)].map((_) => (
                    <Skeleton
                      variant="text"
                      width="70%"
                      sx={{ margin: "20px 80px", borderRadius: 3 }}
                    />
                  ))
                : datas.map((data) => (
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
            <Box
              sx={{
                mb: -12,
                height: "100%",
                width: "70%",
              }}
            >
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: 3 }}
                />
              ) : (
                <ModelViewer />
              )}
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
          width: "30%", // Adjust to your container width
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
                    width: 230,
                    height: 230,
                    borderRadius: "10px",
                  }}
                />
              ))
            : // Show actual outfits when loaded
              [...outfits, ...outfits].map((outfit, index) => (
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