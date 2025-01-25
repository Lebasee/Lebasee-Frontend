import { Box, Divider, Link, Typography, useTheme } from "@mui/material";
import { pallete } from "../../../styles/pallete.m";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import { toPersianNumber } from "../../../utils/toPersianNumber";
import useMediaQuery from "@mui/material/useMediaQuery";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      data-testid="footer"
      sx={{
        width: "100%",
        bgcolor: pallete.primary[500],
        pt: { xs: 4, md: 6 },
        pb: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: { xs: 2, md: 4 },
          color: "white",
        }}
      >
        {/* Main Content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 4, md: 6 },
            pb: { xs: 3, md: 6 },
          }}
        >
          {/* Brand Column */}
          <Box sx={{ textAlign: isMobile ? "center" : "right" }}>
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              لباسی
            </Typography>

            <ContactInfo
              icon={<EmailIcon />}
              content={
                <Link
                  href="mailto:lebasee@example.com"
                  underline="none"
                  color="inherit"
                  sx={{ "&:hover": { color: pallete.secondary[300] } }}
                >
                  lebasee@example.com
                </Link>
              }
            />

            <ContactInfo
              icon={<LocalPhoneIcon />}
              content={toPersianNumber(989123456789) + "+"}
            />

            <ContactInfo
              icon={<LocationOnIcon />}
              content="تهران، منطقه، خیابان"
            />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 3,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <SocialIcon
                href="https://www.linkedin.com/"
                icon={<LinkedInIcon />}
              />
              <SocialIcon
                href="https://www.instagram.com/"
                icon={<InstagramIcon />}
              />
              <SocialIcon
                href="https://www.telegram.com/"
                icon={<TelegramIcon />}
              />
              <SocialIcon
                href="https://www.x.com/"
                icon={<XIcon />}
              />
            </Box>
          </Box>

          {/* FAQ Column */}
          <FooterColumn
            title="سوالات متداول"
            items={[
              "آیا مدل‌های سه‌بعدی دقیق هستند؟",
              "آیا می‌توانم مدل لباس‌های خودم را اضافه کنم؟",
              "این اپلیکیشن با چه دستگاه‌هایی سازگار است؟",
            ]}
            isMobile={isMobile}
          />

          {/* About Column */}
          <FooterColumn
            title="درباره لباسی"
            items={["ویژگی ها و مزایا", "نظرات کاربران", "درباره ما"]}
            isMobile={isMobile}
          />
        </Box>

        {/* Divider */}
        <Divider sx={{ bgcolor: "white", my: { xs: 2, md: 3 } }} />

        {/* Copyright */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            fontSize: { xs: "0.75rem", md: "0.875rem" },
            px: { xs: 1, md: 0 },
          }}
        >
          کلیه حقوق مادی و معنوی محفوظ است. © ۱۴۰۳ لباسی
        </Typography>
      </Box>
    </Box>
  );
};

// Reusable Contact Info Component
const ContactInfo = ({
  icon,
  content,
}: {
  icon: React.ReactNode;
  content: React.ReactNode;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: { xs: "center", md: "flex-start" },
      gap: 1,
      mb: 1.5,
    }}
  >
    {icon}
    <Typography
      variant="body1"
      sx={{ fontWeight: 500 }}
    >
      {content}
    </Typography>
  </Box>
);

// Reusable Social Icon Component
const SocialIcon = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noreferrer"
    color="inherit"
    sx={{
      "&:hover": { color: pallete.secondary[300] },
      transition: "color 0.3s ease",
      fontSize: { xs: "1.5rem", md: "1.75rem" },
    }}
  >
    {icon}
  </Link>
);

// Reusable Footer Column Component
const FooterColumn = ({
  title,
  items,
  isMobile,
}: {
  title: string;
  items: string[];
  isMobile: boolean;
}) => (
  <Box sx={{ textAlign: isMobile ? "center" : "right" }}>
    <Typography
      variant="h5"
      sx={{
        mb: 2,
        fontWeight: 700,
        fontSize: { xs: "1.1rem", md: "1.25rem" },
      }}
    >
      {title}
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {items.map((item) => (
        <Link
          key={item}
          href="#"
          underline="none"
          color="inherit"
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
            "&:hover": { color: pallete.secondary[200] },
            transition: "color 0.3s ease",
          }}
        >
          {item}
        </Link>
      ))}
    </Box>
  </Box>
);

export default Footer;
