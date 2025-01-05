import React, { useEffect, useRef, useState } from "react";
import Cloth from "./cloth";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { ClothType } from "../../../types/types";
import getUserClothes from "../../../api/dashboard/getUserClothes";
import { pallete } from "../../../styles/pallete.m";
import { TextField } from "@mui/material";
import Tshirt_1 from "../../../assets/Tshirt-1.png";
import Tshirt_2 from "../../../assets/Tshirt-2.png";
import Tshirt_3 from "../../../assets/Tshirt-3.png";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import postUserCloth from "../../../api/dashboard/postUserCloth";
import CustomTextField from "../../base/CustomTextField";

const Clothes: React.FC = () => {
  const [clothes, setClothes] = useState<ClothType[]>([]); // Initialize with an empty array
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state

  const [newCloth, setNewCloth] = useState({
    name: "",
    description: "",
    image: null as File | null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewCloth((prev) => ({ ...prev, image: file }));
    }
  };

  const handleAddCloth = async () => {
    if (newCloth.name && newCloth.description && newCloth.image) {
      const formData = new FormData();
      formData.append("caption", newCloth.description); // Adding description as caption
      formData.append("image", newCloth.image as File); // Ensure `image` is a File object

      try {
        const response = await postUserCloth(formData);

        if (response?.status === 200 || response?.status === 201) {
          // Status 201 is also common for POST requests
          alert("Cloth added successfully!");
          // Reset the form
          setNewCloth({ name: "", description: "", image: null });
          // Optionally reload or fetch the updated clothes list
        } else {
          alert("Failed to add cloth. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading cloth:", error);
        alert("An error occurred while adding the cloth. Please try again.");
      }
    } else {
      alert("Please fill in all fields and upload an image.");
    }
  };

  const handleDelete = () => {
    setNewCloth({ name: "", description: "", image: null }); // Reset newCloth state
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear file input
    }
  };

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const fetchedClothes = await getUserClothes();
        setClothes(
          fetchedClothes.map((cloth) => ({
            ...cloth,
            description: cloth.description || "", // Ensure description is always a string
            image: cloth.image || "", // Ensure image is always a string
            name: cloth.name || "", // Ensure name is always a string
          }))
        );
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching clothes:", error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    fetchClothes();
  }, []);

  if (isLoading) {
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
        <CircularProgress color="primary" /> {/* Loading spinner */}
      </Box>
    );
  }

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
          description={cloth.description ? cloth.description : ""} // Guaranteed to be a string
          image={cloth.image} // Guaranteed to be a string
          name={cloth.name} // Guaranteed to be a string
          key={cloth.id}
        />
      ))}

      {/* Add New Picture Avatar with Name and Description */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Add Picture Avatar */}
        <Box
          sx={{
            height: 270,
            width: 270,
            mr: "5%",
            borderRadius: 2,
            border: `2px dashed ${pallete.primary[500]}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef} // Attach ref to the file input
            style={{
              position: "absolute",
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
            onChange={handleFileChange}
          />
          {/* Show uploaded image or placeholder */}
          {newCloth.image ? (
            <Avatar
              src={URL.createObjectURL(newCloth.image)}
              sx={{ height: "100%", width: "100%", borderRadius: 2 }}
            />
          ) : (
            <IconButton>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef} // Attach ref to the file input
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                onChange={handleFileChange}
              />
              <AddIcon sx={{ fontSize: 50, color: pallete.primary[500] }} />
            </IconButton>
          )}
        </Box>

        {/* Fields for Name and Description with Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "60%",
            mr: 10,
          }}
        >
          {/* Fields */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
            }}
          >
            {/* Picture Name Field */}
            <CustomTextField
              fullWidth
              label="نام لباس"
              variant="filled"
              value={newCloth.name}
              placeholder="نام لباس جدید را وارد کنید"
              onChange={(e) =>
                setNewCloth({ ...newCloth, name: e.target.value })
              }
              sx={{
                bgcolor: pallete.secondary[200],
                borderRadius: 1,
                mb: 2,
              }}
            />

            {/* Description Field */}
            <CustomTextField
              fullWidth
              label="توضیحات لباس"
              variant="filled"
              value={newCloth.description}
              placeholder="توضیحات مربوط به لباس جدید را وارد کنید"
              onChange={(e) =>
                setNewCloth({ ...newCloth, description: e.target.value })
              }
              multiline
              rows={4}
              sx={{
                bgcolor: pallete.secondary[200],
                borderRadius: 1,
              }}
            />
          </Box>
          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mr: 5,
            }}
          >
            {/* Add Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCloth}
              sx={{
                mb: 2,
                width: 120, // Increased width
                backgroundColor: pallete.primary[600], // Background color for ذخیره
                color: "white", // White text for contrast
                "&:hover": { backgroundColor: pallete.primary[800] }, // Slightly lighter black on hover
              }}
            >
              افزودن
            </Button>

            {/* Cancel Button */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDelete}
              sx={{
                width: 120, // Increased width
                color: "black", // Text color
                backgroundColor: pallete.secondary[400], // Background color for انصراف
                "&:hover": { backgroundColor: pallete.secondary[600] }, // Slightly lighter black on hover
              }}
            >
              لغو
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Clothes;