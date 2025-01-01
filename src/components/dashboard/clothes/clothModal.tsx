// import React, { useEffect, useState } from "react";
// import { Modal, Box, TextField, Button, Typography } from "@mui/material";
// import { useParams, useHistory } from "react-router-dom";

// interface Cloth {
//   id: string;
//   name: string;
//   description: string;
//   size: string;
//   color: string;
// }

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// const ClothModal: React.FC = () => {
//   const { clothId } = useParams<{ clothId?: string }>(); // Get clothId from URL params
//   const history = useHistory();
//   const [open, setOpen] = useState(false);
//   const [cloth, setCloth] = useState<Cloth | null>(null);

//   // Function to handle modal opening and closing
//   useEffect(() => {
//     if (clothId) {
//       // Fetch the existing cloth data to edit
//       fetchCloth(clothId);
//       setOpen(true);
//     } else {
//       // Prepare the modal for adding a new cloth
//       setCloth({ id: "", name: "", description: "", size: "", color: "" });
//       setOpen(true);
//     }
//   }, [clothId]);

//   const fetchCloth = async (id: string) => {
//     // Simulating fetching data from an API
//     const response = await fetch(`/api/clothes/${id}`);
//     const data = await response.json();
//     setCloth(data);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     history.push("/clothes"); // Redirect to the main clothes page or wherever you'd like
//   };

//   const handleSubmit = async () => {
//     const method = cloth?.id ? "PUT" : "POST";
//     const url = cloth?.id ? `/api/clothes/${cloth.id}` : "/api/clothes";

//     const response = await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(cloth),
//     });

//     if (response.ok) {
//       handleClose();
//     } else {
//       console.error("Failed to save cloth");
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (cloth) {
//       setCloth({
//         ...cloth,
//         [name]: value,
//       });
//     }
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//     >
//       <Box sx={modalStyle}>
//         <Typography variant="h6">
//           {cloth?.id ? "Edit Cloth" : "Add New Cloth"}
//         </Typography>
//         <TextField
//           fullWidth
//           label="Cloth Name"
//           name="name"
//           value={cloth?.name || ""}
//           onChange={handleChange}
//           sx={{ mt: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Description"
//           name="description"
//           value={cloth?.description || ""}
//           onChange={handleChange}
//           sx={{ mt: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Size"
//           name="size"
//           value={cloth?.size || ""}
//           onChange={handleChange}
//           sx={{ mt: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Color"
//           name="color"
//           value={cloth?.color || ""}
//           onChange={handleChange}
//           sx={{ mt: 2 }}
//         />
//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//           <Button
//             onClick={handleClose}
//             variant="outlined"
//             color="secondary"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             color="primary"
//           >
//             {cloth?.id ? "Save Changes" : "Add Cloth"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default ClothModal;
