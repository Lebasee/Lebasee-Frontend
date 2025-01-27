import React, { RefObject, useState } from "react";
import {
  IconButton,
  ImageListItemBar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { ClothType, ToastData } from "../../../types/types";
import deleteUserCloth from "../../../api/dashboard/deleteUserCloth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import patchUserClothCaption from "../../../api/dashboard/patchUserClothCaption";
import CustomTextField from "../../base/CustomTextField";
import AddIcon from "@mui/icons-material/Add";

interface InputProps {
  cloth: ClothType;
  setReloadImage: (value: boolean) => void; // Function that updates reload state
  setToastData: (data: ToastData) => void; // Function that updates toast data
  setIsLoading: (value: boolean) => void; // Function that updates loading state
  setNewCloth?: (value: { caption: string; image: File | null }) => void; // Optional function to update new cloth
  fileInputRef?: RefObject<HTMLInputElement>;
  handleAddCloth?: () => void;
}

const CustomImageListBar: React.FC<InputProps> = ({
  cloth,
  setReloadImage,
  setToastData,
  setIsLoading,
  setNewCloth,
  fileInputRef,
  handleAddCloth,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // Tracks delete confirmation dialog state
  const [caption, setCaption] = useState(cloth.caption);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    console.log(caption);
    if (cloth.id === -1) {
      setNewCloth?.({
        caption: caption,
        image: typeof cloth.image === "string" ? null : cloth.image,
      }); // Spread ensures a new object
      setIsLoading(false);
      setIsEditing(false); // Close the dialog after save
      return;
    }
    setIsLoading(true);
    try {
      if (caption.length === 0) {
        setToastData({
          open: true,
          message: "توضیحات نمی‌تواند خالی باشد.",
          severity: "error",
        });
        return;
      }
      const response = await patchUserClothCaption({
        id: cloth.id,
        caption: caption,
      });
      if (response?.status === 200) {
        setReloadImage(true);
        setToastData({
          open: true,
          message: "لباس با موفقیت ویرایش شد.",
          severity: "success",
        });
      } else {
        throw new Error("Failed to update caption");
      }
    } catch (error) {
      setToastData({
        open: true,
        message: "خطا در برقراری ارتباط با سرور.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
      setIsEditing(false); // Close the dialog after save
    }
  };

  const handleDeleteCloth = async () => {
    if (cloth.id === -1) {
      setNewCloth?.({ caption: "", image: null });
      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }
      setIsDeleting(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await deleteUserCloth(cloth.id);
      if (response?.status === 204) {
        setReloadImage(true);
        setToastData({
          open: true,
          message: "لباس با موفقیت حذف شد.",
          severity: "success",
        });
      } else {
        throw new Error("Failed to delete cloth");
      }
    } catch (error) {
      setToastData({
        open: true,
        message: "خطا در برقراری ارتباط با سرور.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
      setIsDeleting(false); // Close the delete confirmation dialog
    }
  };

  return (
    <>
      {/* ImageListItemBar */}
      <ImageListItemBar
        title={
          cloth.id === -1
            ? "افزودن " + (cloth.is_outfit ? "استایل" : "لباس")
            : "T-shirt"
        }
        subtitle={caption}
        actionPosition="left"
        actionIcon={
          <>
            <IconButton
              sx={{ color: "white" }}
              aria-label={`edit ${cloth.caption}`}
              onClick={handleEditClick}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ color: "white", ml: 1 }}
              aria-label={`delete ${cloth.caption}`}
              onClick={() => setIsDeleting(true)} // Open delete confirmation dialog
            >
              <DeleteIcon />
            </IconButton>

            {cloth.id === -1 && (
              <IconButton
                sx={{ color: "white", ml: -1, mr: -1 }}
                aria-label={`add ${cloth.caption}`}
                onClick={handleAddCloth} // Open delete confirmation dialog
              >
                <AddIcon />
              </IconButton>
            )}
          </>
        }
        sx={{
          width: "100%",
          background: "rgba(0, 0, 0, 0.6)",
          transition: "opacity 0.3s ease",
          opacity: 1,
        }}
      />

      {/* Edit Dialog */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)} fullWidth>
        <DialogTitle>
          {cloth.id === -1 ? (
            <Typography>
              توضیحات {cloth.is_outfit ? "استایل" : "لباس"} جدید
            </Typography>
          ) : (
            <Typography>ویرایش توضیحات</Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <CustomTextField
            fullWidth
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} color="secondary">
            لغو
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onClose={() => setIsDeleting(false)} fullWidth>
        <DialogTitle>
          <Typography>حذف لباس</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>از حذف این لباس مطمئن هستید ؟</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleting(false)} color="secondary">
            لغو
          </Button>
          <Button onClick={handleDeleteCloth} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomImageListBar;