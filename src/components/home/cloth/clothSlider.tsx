import { useEffect, useState } from "react";
import getClothes from "../../../api/home/getClothes";
import { ClothType } from "../../../types/types";
import { ImageListItem, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";

import "swiper/swiper-bundle.css";
import { pallete } from "../../../styles/pallete.m";

const ClothSlider = () => {
  const [clothes, setClothes] = useState<ClothType[]>([]);
  const [selectedClothId, setSelectedClothId] = useState<number | null>(null);

  useEffect(() => {
    const fetchClothes = async () => {
      const response = await getClothes();
      setClothes(response);
    };
    fetchClothes();
  }, []);

  const handleSelect = (id: number) => {
    setSelectedClothId(id);
  };

  return (
    <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
    >
      {clothes.map((cloth) => (
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
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for scale and shadow

              "&:hover": {
                transform: selectedClothId === cloth.id ? "" : "scale(1.05)",
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
                height: "280px",
                objectFit: "cover",
                borderRadius: "8px",
                transform: selectedClothId === cloth.id ? "scale(1.05)" : "",
                border:
                  selectedClothId === cloth.id
                    ? "2px solid" + pallete.primary[500] // Highlight selected item
                    : "none",
                boxShadow:
                  selectedClothId === cloth.id
                    ? "0 0 6px" + pallete.primary[500] // Add shadow on hover
                    : "none",
              }}
              loading="lazy"
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ClothSlider;
