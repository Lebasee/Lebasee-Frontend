import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import { useEffect, useState } from "react";
import PopupMenu from "./popupMenu";
import getUserInfo from "../../../api/dashboard/getUserInfo";
import { User } from "../../../types/types";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userProfile, setUserProfile] = useState<User>({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await getUserInfo();
      setUserProfile(response);
    };
    fetchUserProfile();
  }, []);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: pallete.secondary[800],
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          maxWidth: "1126px",
          margin: "auto",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: pallete.primary[100] }}
        >
          لباسی
        </Typography>
        <IconButton
          size="small"
          onClick={handleClick}
        >
          <Avatar
            src={
              userProfile.profile_image
                ? `${import.meta.env.VITE_BACKEND_API_URL}${
                    userProfile.profile_image
                  }`
                : ""
            }
            sx={{
              width: 36,
              height: 36,
              bgcolor: pallete.primary[100],
              color: pallete.secondary[900],
            }}
          >
            {userProfile.first_name?.charAt(0)}
          </Avatar>
        </IconButton>
      </Box>
      <PopupMenu
        userProfile={userProfile}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </Box>
  );
};

export default Header;
