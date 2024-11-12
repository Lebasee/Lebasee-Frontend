import { Box, Divider, Link, Typography } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import { toPersianNumber } from "../../../utils/toPersianNumber";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "340px",
        bgcolor: pallete.primary[500],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1063px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            height: "90%",
            width: "100%",
            p: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography
              variant="h3"
              color="white"
              sx={{ mb: 2 }}
            >
              لباسی
            </Typography>
            <Typography
              variant="body1"
              fontWeight={700}
              color="white"
              sx={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <EmailIcon />
              <Link
                variant="body1"
                color="#FFFFFF"
                fontWeight={700}
                href="mailto:lebasee@example.com"
                underline="none"
              >
                lebasee@example.com
              </Link>
            </Typography>
            <Typography
              variant="body1"
              fontWeight={700}
              color="white"
              sx={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <LocalPhoneIcon />
              {toPersianNumber(989123456789)}+
            </Typography>
            <Typography
              variant="body1"
              fontWeight={700}
              color="white"
              sx={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <LocationOnIcon />
              تهران، منطقه، خیابان
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                mt: 2,
              }}
            >
              <Link
                color="#FFFFFF"
                underline="none"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon fontSize="large" />
              </Link>
              <Link
                color="#FFFFFF"
                underline="none"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon fontSize="large" />
              </Link>
              <Link
                color="#FFFFFF"
                underline="none"
                href="https://www.telegram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <TelegramIcon fontSize="large" />
              </Link>
              <Link
                color="#FFFFFF"
                underline="none"
                href="https://www.x.com/"
                target="_blank"
                rel="noreferrer"
              >
                <XIcon fontSize="large" />
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography
              variant="h5"
              color="white"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              سوالات متداول
            </Typography>
            <Link
              variant="body2"
              color="#FFFFFF"
              href="#"
              underline="none"
            >
              آیا مدل‌های سه‌بعدی دقیق هستند؟
            </Link>
            <Link
              variant="body2"
              color="#FFFFFF"
              href="#"
              underline="none"
            >
              آیا می‌توانم مدل لباس‌های خودم را اضافه کنم؟{" "}
            </Link>
            <Link
              variant="body2"
              color="#FFFFFF"
              href="#"
              underline="none"
            >
              این اپلیکیشن با چه دستگاه‌هایی سازگار است؟{" "}
            </Link>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography
              variant="h5"
              color="white"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              بلاگ
            </Typography>
            <Link
              variant="body2"
              color="#FFFFFF"
              href="#"
              underline="none"
            >
              بلاگ یک
            </Link>
            <Link
              variant="body2"
              color="#FFFFFF"
              href="#"
              underline="none"
            >
              بلاگ دو
            </Link>
            <Link
              variant="body2"
              color="#FFFFFF"
              href="#"
              underline="none"
            >
              بلاگ سه
            </Link>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography
              variant="h5"
              color="white"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              درباره لباسی
            </Typography>
            <Link
              variant="body2"
              color="#FFFFFF"
              href="#"
              underline="none"
            >
              ویژگی ها و مزایا
            </Link>
            <Link
              variant="body2"
              color="#FFFFFF"
              href="#"
              underline="none"
            >
              نظرات کاربران
            </Link>
            <Link
              variant="body2"
              color="#FFFFFF"
              href="#"
              underline="none"
            >
              درباره ما
            </Link>
          </Box>
        </Box>
        <Divider
          flexItem
          variant="fullWidth"
          sx={{ bgcolor: "#FFFFFF" }}
        />
        <Typography
          variant="body1"
          color="white"
          textAlign="center"
        >
          کلیه حقوق مادی و معنوی محفوظ است. © 1403 لباسی
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
