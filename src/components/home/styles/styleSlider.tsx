import { useEffect, useState } from "react";
import getClothes from "../../../api/home/getClothes";
import { ClothType } from "../../../types/types";
import { ImageListItem } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";

import "swiper/swiper-bundle.css";

const ClothSlider = () => {
  const [clothes, setClothes] = useState<ClothType[]>([]);

  useEffect(() => {
    const fetchClothes = async () => {
      const response = await getClothes();
      setClothes(response);
      console.log(response);
    };
    fetchClothes();
  }, []);

  return (
    <Swiper
      modules={[Navigation, A11y]}
      slidesPerView={2}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {clothes.map((cloth) => (
        <SwiperSlide>
          <ImageListItem
            key={cloth.id}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <img
              src={cloth.image as string}
              alt={cloth.description}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
                transition: "transform 0.3s ease",
              }}
              loading="lazy"
            />
          </ImageListItem>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ClothSlider;
