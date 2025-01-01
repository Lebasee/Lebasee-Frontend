import React from "react";
import Tshirt_1 from "../../../assets/Tshirt-1.png";
import Tshirt_2 from "../../../assets/Tshirt-2.png";
import Tshirt_3 from "../../../assets/Tshirt-3.png";
import Cloth from "./cloth";
import { Box } from "@mui/material";

const clothes = [
  {
    name: "تی شرت",
    image: Tshirt_1,
    id: 1,
    description: "یک تی شرت راحت از جنس پنبه",
  },
  {
    name: "تی شرت",
    image: Tshirt_2,
    id: 2,
    description: "یک تی شرت با یقه گرد شیک",
  },
  {
    name: "تی شرت",
    image: Tshirt_3,
    id: 3,
    description: "یک تی شرت گرافیکی رنگارنگ",
  },
  {
    name: "تی شرت",
    image: Tshirt_2,
    id: 4,
    description: "یک تی شرت راحت برای استفاده روزمره",
  },
  {
    name: "تی شرت",
    image: Tshirt_1,
    id: 5,
    description: "یک تی شرت ساده و شیک",
  },
  {
    name: "تی شرت",
    image: Tshirt_3,
    id: 6,
    description: "یک تی شرت مد روز و راحت",
  },
  {
    name: "تی شرت",
    image: Tshirt_3,
    id: 7,
    description: "یک تی شرت با طراحی خاص و منحصر به فرد",
  },
  {
    name: "تی شرت",
    image: Tshirt_1,
    id: 8,
    description: "یک تی شرت با کیفیت بالا",
  },
  {
    name: "تی شرت",
    image: Tshirt_1,
    id: 9,
    description: "یک تی شرت فوق العاده نرم",
  },
];

const Clothes: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        px: "25px",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: "15px",
      }}
    >
      {clothes.map((cloth) => (
        <Cloth
          description={cloth.description}
          image={cloth.image}
          name={cloth.name}
          key={cloth.id}
        />
        // <ClothSkeleton />
      ))}
    </Box>
  );
};

export default Clothes;
