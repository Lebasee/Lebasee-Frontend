import React, { useState, useEffect } from "react";
import Testimonial from "./testimonial";
import { Box, Typography } from "@mui/material";
import user1Image from "../../../assets/user1.jpg";
import user2Image from "../../../assets/user2.jpg";
import user3Image from "../../../assets/user3.jpg";
import user4Image from "../../../assets/user4.jpg";
import { pallete } from "../../../styles/pallete.m";

const testimonials = [
  {
    name: "آرزو کیانی",
    text: "من تجربه استفاده از لباسی را داشتم و واقعا از ویژگی‌های این پلتفرم شگفت‌زده شدم. به راحتی می‌توانم ابعاد بدن خود را وارد کنم و مدل سه‌بعدی دقیقی از خودم دریافت کنم. پیشنهاد لباس‌ها بر اساس سایز من عالی بود و به من کمک کرد تا بهترین انتخاب‌ها را داشته باشم. این اپلیکیشن به طور کلی بسیار کاربردی و راحت است!",
    image: user1Image,
  },
  {
    name: "محمد حسینی",
    text: "لباسی باعث شده تا تجربه خرید لباس آنلاین برای من راحت‌تر و دقیق‌تر شود. از آنجا که می‌توانم مدل 3D بدن خودم را مشاهده کنم، دیگر هیچ نگرانی‌ای در مورد اندازه لباس‌ها ندارم. همچنین پیشنهادات لباس‌ها به دقت با سایز و استایل من تطابق دارد. واقعا این اپلیکیشن به یک تجربه خرید راحت‌تر و هوشمندانه‌تر تبدیل شده است.",
    image: user2Image,
  },
  {
    name: "سحر احمدی",
    text: "لباسی یک پلتفرم فوق‌العاده برای کسانی است که همیشه در انتخاب اندازه لباس مشکل دارند. مدل 3D که از بدن خودم می‌سازم، به من این امکان را می‌دهد که دقیقا بدانم چه لباسی به من می‌آید. من از پیشنهادات لباس‌هایی که برای من ارائه می‌شود نیز راضی هستم. این اپلیکیشن واقعا نیاز به خرید آنلاین را به سطح جدیدی ارتقا داده است.",
    image: user3Image,
  },
  {
    name: "حسین مصطفوی",
    text: "به کمک لباسی، خرید لباس به یک تجربه کاملاً جدید تبدیل شده است. داشتن مدل سه‌بعدی از بدن خودم باعث می‌شود تا انتخاب‌های دقیق‌تری داشته باشم. همچنین پیشنهادات لباس‌ها بسیار مرتبط با سبک و نیازهای من است. این اپلیکیشن به من کمک کرده تا خریدهای آنلاین راحت‌تر و سریع‌تر انجام دهم.",
    image: user4Image,
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setFadeIn(true);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFadeIn(true);
    }, 800);
  };

  return (
    <Box
      data-testid="testimonials"
      sx={{
        maxWidth: "1063px",
        width: "100%",
        height: "450px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
      }}
    >
      <Typography
        color="white"
        variant="h3"
      >
        نظرات کاربران
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Testimonial
          name={testimonials[currentIndex].name}
          text={testimonials[currentIndex].text}
          image={testimonials[currentIndex].image}
          fadeIn={fadeIn}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: "8px",
          }}
        >
          {testimonials.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleDotClick(index)}
              sx={{
                width: index === currentIndex ? "40px" : "12px",
                height: "12px",
                borderRadius: index === currentIndex ? "6px" : "50%",
                backgroundColor:
                  index === currentIndex ? pallete.primary[500] : "#ddd",
                cursor: "pointer",
                transition: "width 0.3s ",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonials;
