import { Avatar, Box, IconButton } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import { useEffect, useState } from "react";
import PopupMenu from "./popupMenu";
import getUserInfo from "../../../api/dashboard/getUserInfo";
import { User } from "../../../types/types";
import Logo from "../../../assets/logo_primary.svg";

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
          p: { md: 1, xs: "8px 20px" },
          maxWidth: "1226px",
          margin: "auto",
        }}
      >
        <img
          src={Logo}
          alt="لباسی"
          style={{
            height: "25px", // Adjust the height as needed
            width: "auto", // Adjust the width as needed
            color: "white", // If you want to change the color of the SVG
          }}
        />
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
