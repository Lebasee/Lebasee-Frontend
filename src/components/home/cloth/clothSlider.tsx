import { ClothType } from "../../../types/types";
import { Box, Skeleton, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { pallete } from "../../../styles/pallete.m";
import "./swiper.css";

interface ClothSliderProps {
  loading: boolean;
  itemPerView: number;
  clothes: ClothType[];
  selectedCloth: ClothType | undefined;
  setselectedCloth: (arg0: ClothType | undefined) => void;
}

const ClothSlider = ({
  loading,
  clothes,
  selectedCloth,
  itemPerView,
  setselectedCloth,
}: ClothSliderProps) => {
  const handleSelect = (id: number) => {
    const selected = clothes.find((x) => x.id === id);
    setselectedCloth(selected);
  };

  return (
    <Swiper
      modules={[Navigation, A11y]}
      navigation
      spaceBetween={loading ? 16 : 0}
      slidesPerView={itemPerView}
      className={`custom-swiper ${!loading && "padding"}`}
      
    >
      {loading ? (
        Array.from({ length: 3 }, (_, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                borderRadius: 10,
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={280}
                sx={{ borderRadius: 8 }}
              />
            </Box>
          </SwiperSlide>
        ))
      ) : clothes.length === 0 ? (
        <Typography
          variant="h5"
          sx={{
            color: pallete.primary[100],
            textAlign: "center",
            padding: "16px",
          }}
        >
          هیچ آیتمی وجود ندارد.
        </Typography>
      ) : (
        clothes.map((cloth) => (
          <SwiperSlide
            key={cloth.id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                padding: "16px",
                height: "100%",
                width: "100%",
                cursor: "pointer",
                borderRadius: 10,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform:
                    selectedCloth?.id === cloth.id ? "" : "scale(1.05)",
                },
              }}
              onClick={() => handleSelect(cloth.id)}
            >
              <img
                src={cloth.image as string}
                alt={cloth.description}
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  minHeight: 150,
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "8px",
                  transform:
                    selectedCloth?.id === cloth.id ? "scale(1.05)" : "",
                  border:
                    selectedCloth?.id === cloth.id
                      ? "2px solid" + pallete.primary[500]
                      : "none",
                  boxShadow:
                    selectedCloth?.id === cloth.id
                      ? "0 0 6px" + pallete.primary[500]
                      : "none",
                }}
                loading="lazy"
              />
            </Box>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default ClothSlider;
