import {
  Box,
  Grid,
  Typography,
  IconButton,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Tshirt_1 from "../../../assets/Tshirt-1.png";
import Tshirt_2 from "../../../assets/Tshirt-2.png";
import Tshirt_3 from "../../../assets/Tshirt-3.png";
import EditIcon from "@mui/icons-material/Edit";
import { pallete } from "../../../styles/pallete.m";
import AddIcon from "@mui/icons-material/Add";

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
  const [hoveredClothId, setHoveredClothId] = useState<number | null>(null);
  const [clickedClothId, setClickedClothId] = useState<number | null>(null);
  const [editingDescription, setEditingDescription] = useState<number | null>(
    null
  );
  const [editedDescription, setEditedDescription] = useState<string>("");

  // Break the array into chunks of 3
  const chunkedClothes = [];
  for (let i = 0; i < clothes.length; i += 3) {
    chunkedClothes.push(clothes.slice(i, i + 3));
  }

  const handleMouseEnter = (id: number) => {
    setHoveredClothId(id); // Show description when hovering
  };

  const handleMouseLeave = () => {
    setHoveredClothId(null); // Hide description when mouse leaves
  };

  const handleClick = (id: number) => {
    // Toggle the visibility of the description box on click
    setClickedClothId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id: number, currentDescription: string) => {
    // Set the description to be edited
    setEditingDescription(id);
    setEditedDescription(currentDescription);
  };

  const handleSaveEdit = (id: number) => {
    // Save the edited description to the cloth item
    const updatedClothes = [...clothes];
    const clothIndex = updatedClothes.findIndex((cloth) => cloth.id === id);
    if (clothIndex > -1) {
      updatedClothes[clothIndex].description = editedDescription;
    }
    setEditingDescription(null); // Exit editing mode
    setEditedDescription(""); // Clear the editing text field
  };

  const [newCloth, setNewCloth] = useState({
    name: "",
    description: "",
    image: null as string | null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          setNewCloth((prev) => ({
            ...prev,
            image: e.target?.result as string,
          }));
        }
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleAddCloth = () => {
    if (newCloth.name && newCloth.description && newCloth.image) {
      clothes.push({
        id: clothes.length + 1,
        name: newCloth.name,
        description: newCloth.description,
        image: newCloth.image,
      });
      setNewCloth({ name: "", description: "", image: null });
    } else {
      alert("Please fill in all fields and upload an image.");
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDelete = () => {
    setNewCloth({ name: "", description: "", image: null }); // Reset newCloth state
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear file input
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "90%",
          width: "90%",
          m: "50px 40px 40px 40px",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar in WebKit browsers
          },
          "-ms-overflow-style": "none", // Hide scrollbar in IE and Edge
          "scrollbar-width": "none", // Hide scrollbar in Firefox
        }}
      >
        {chunkedClothes.map((chunk, chunkIndex) => (
          <Grid container spacing={3} sx={{ mb: 6 }} key={chunkIndex}>
            {chunk.map((cloth) => (
              <Grid item xs={4} key={cloth.id}>
                <Box
                  onMouseEnter={() => handleMouseEnter(cloth.id)}
                  onMouseLeave={handleMouseLeave}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Avatar
                    src={cloth.image}
                    sx={{
                      height: 270,
                      width: 270,
                      borderRadius: 2,
                      zIndex: 1000,
                      cursor: "pointer", // Make Avatar clickable
                    }}
                    onClick={() => handleClick(cloth.id)} // Toggle visibility on click
                  />

                  {/* Description Box with enhanced transition */}
                  {(hoveredClothId === cloth.id ||
                    clickedClothId === cloth.id) && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: "10%",
                        width: "30%",
                        height: "100%",
                        bgcolor: pallete.primary[500],
                        padding: "15px",
                        borderRadius: "8px",
                        opacity: 0,
                        transform: "scale(0.9) translateX(20px)",
                        transition:
                          "opacity 0.3s ease-out, transform 0.3s ease-out",
                        "&.visible": {
                          opacity: 1,
                          transform: "scale(1) translateX(0)",
                        },
                      }}
                      className={
                        hoveredClothId === cloth.id ||
                        clickedClothId === cloth.id
                          ? "visible"
                          : ""
                      }
                    >
                      <Typography
                        variant="h6"
                        color="black"
                        sx={{
                          mb: 1,
                          textAlign: "right",
                          overflow: "auto",
                          wordWrap: "break-word",
                        }}
                      >
                        {cloth.name}
                      </Typography>

                      {/* Editable Description */}
                      {editingDescription === cloth.id ? (
                        <TextField
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          multiline
                          fullWidth
                          variant="outlined"
                          sx={{
                            color: "black",
                            borderRadius: "8px",
                            mb: 2,
                          }}
                        />
                      ) : (
                        <Typography
                          variant="body2"
                          color="black"
                          sx={{
                            mb: 2,
                            textAlign: "right",
                            overflow: "auto",
                            wordWrap: "break-word",
                          }}
                        >
                          {cloth.description || ""}
                        </Typography>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          position: "absolute",
                          bottom: "10px",
                        }}
                      >
                        {/* Edit Button */}
                        {editingDescription === cloth.id ? (
                          <Button
                            onClick={() => handleSaveEdit(cloth.id)}
                            sx={{ color: "black", mr: 1 }}
                          >
                            ذخیره
                          </Button>
                        ) : (
                          <IconButton
                            onClick={() =>
                              handleEdit(cloth.id, cloth.description)
                            }
                          >
                            <EditIcon sx={{ color: "black" }} />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
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
              mr: 15,
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
                src={newCloth.image}
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
              <TextField
                fullWidth
                label="نام لباس"
                variant="outlined"
                value={newCloth.name}
                placeholder="نام لباس جدید را وارد کنید"
                onChange={(e) =>
                  setNewCloth({ ...newCloth, name: e.target.value })
                }
                InputLabelProps={{
                  style: { color: "black", textAlign: "right" }, // Right-align label
                }}
                InputProps={{
                  style: {
                    color: "black",
                    backgroundColor: pallete.secondary[200], // Background color of input fields
                  },
                }}
                sx={{
                  mb: 2,
                  "& label": {
                    transformOrigin: "right",
                    left: "inherit",
                    right: "2rem",
                    top: "-0.2rem",
                    overflow: "unset",
                  },
                  "& legend": {
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "16px",
                  },
                }}
              />

              {/* Description Field */}
              <TextField
                fullWidth
                label="توضیحات لباس"
                variant="outlined"
                value={newCloth.description}
                placeholder="توضیحات مربوط به لباس جدید را وارد کنید"
                onChange={(e) =>
                  setNewCloth({ ...newCloth, description: e.target.value })
                }
                multiline
                rows={4}
                InputLabelProps={{
                  style: { color: "black", textAlign: "right" }, // Right-align label
                }}
                InputProps={{
                  style: {
                    color: "black",
                    backgroundColor: pallete.secondary[200], // Background color of input fields
                  },
                }}
                sx={{
                  "& label": {
                    transformOrigin: "right",
                    left: "inherit",
                    right: "2rem",
                    top: "-0.2rem",
                    overflow: "unset",
                  },
                  "& legend": {
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "16px",
                  },
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
    </Box>
  );
};

export default Clothes;