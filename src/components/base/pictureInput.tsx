import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  Slider,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Cropper, { Area } from "react-easy-crop";

interface PictureModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (image: string) => void;
}

const PictureModal: React.FC<PictureModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      setIsCropping(true);
    }
  };

  const getCroppedImage = async (): Promise<string | null> => {
    if (!image || !croppedArea) return null;

    const imageElement = new Image();
    imageElement.src = image;
    await new Promise<void>((resolve) => {
      imageElement.onload = () => resolve();
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const { x, y, width, height } = croppedArea;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(imageElement, x, y, width, height, 0, 0, width, height);

      return canvas.toDataURL("image/jpeg");
    }
    return null;
  };

  const handleConfirm = async () => {
    const croppedImage = await getCroppedImage();
    if (croppedImage && onConfirm) {
      onConfirm(croppedImage);
      reset();
    }
  };

  const reset = () => {
    setImage(null);
    setCroppedArea(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setIsCropping(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography
          variant="h4"
          color="primary"
        >
          آپلود تصویر
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: "100%",
            height: "500px",
            bgcolor: "#F0F0F0",
            borderRadius: "6px",
          }}
        >
          {!isCropping && (
            <>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
                id="upload-image"
              />
              <label htmlFor="upload-image">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    ":hover": { cursor: "pointer" },
                  }}
                >
                  <AddPhotoAlternateIcon
                    sx={{ color: "#aaaaaa", fontSize: 50 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "#888888" }}
                  >
                    آپلود تصویر
                  </Typography>
                </Box>
              </label>
            </>
          )}

          {isCropping && image && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  px: 2,
                }}
              >
                <IconButton onClick={handleConfirm}>
                  <CheckCircleIcon />
                </IconButton>
                <IconButton onClick={reset}>
                  <CancelIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "60px",
                  width: "80%",
                  left: "10%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#000000" }}
                >
                  زوم
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(_, value) => setZoom(value as number)}
                />
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: "16px", m: 0 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{ ml: 1 }}
        >
          بستن
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
        >
          تایید
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PictureModal;
