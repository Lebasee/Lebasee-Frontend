import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { User } from "../../../types/types";
import { useNavigate } from "react-router-dom";

interface PopupMenuProps {
  userProfile: User;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const PopupMenu: React.FC<PopupMenuProps> = ({
  userProfile,
  anchorEl,
  setAnchorEl,
}: PopupMenuProps) => {
  const navigator = useNavigate();
  const menuSections = [
    {
      tag: "داشبورد",
      icon: <DashboardIcon fontSize="small" />,
      href: "/dashboard",
    },
    {
      tag: "ترکیب ها",
      icon: <BookmarksIcon fontSize="small" />,
      href: "/dashboard/tryons",
    },
    {
      tag: "استایل ها",
      icon: <StyleIcon fontSize="small" />,
      href: "/dashboard/styles",
    },
    {
      tag: "لباس ها",
      icon: <CheckroomIcon fontSize="small" />,
      href: "/dashboard/clothes",
    },
    {
      tag: "تنظیمات",
      icon: <SettingsIcon fontSize="small" />,
      href: "/dashboard/setting",
    },
  ];

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    handleClose();
    navigator("/auth/login");
  };

  const handleMenuItemClick = (href: string) => {
    navigator(href);
    handleClose();
  };

  return (
    <Paper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.1,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                mr: -0.5,
                ml: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 15,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem
          sx={{
            pointerEvents: "none", // Prevents click interaction
            "&:hover": { bgcolor: "transparent" }, // Removes hover effect
          }}
        >
          <ListItemIcon>
            {userProfile.profile_image ? (
              <Avatar
                src={
                  userProfile.profile_image
                    ? `${import.meta.env.VITE_BACKEND_API_URL}${
                        userProfile.profile_image
                      }`
                    : ""
                }
              />
            ) : (
              <Avatar />
            )}
          </ListItemIcon>
          <ListItemText>
            {userProfile.first_name} {userProfile.last_name}
            <br />
            {userProfile.email}
          </ListItemText>
        </MenuItem>
        <Divider component="li" />
        {menuSections.map((section, index) => {
          return (
            <MenuItem
              onClick={() => handleMenuItemClick(section.href)}
              key={index}
            >
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText>{section.tag}</ListItemText>
            </MenuItem>
          );
        })}
        <Divider component="li" />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>خروج</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default PopupMenu;
