import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { pallete } from "../../../styles/pallete.m";
import { toPersianNumber } from "../../../utils/toPersianNumber";

interface CounterProps {
  end: number;
  label: string;
}

const Counter: React.FC<CounterProps> = ({ end, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = Math.ceil(end / 10);
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev + increment >= end) {
          clearInterval(timer);
          return end;
        }
        return prev + increment;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <Box textAlign="center">
      <Typography
        variant="h2"
        sx={{ fontWeight: "700" }}
        color={`${pallete.primary[500]}`}
      >
        {toPersianNumber(count)}+
      </Typography>
      <Typography
        variant="body1"
        color="white"
      >
        {label}
      </Typography>
    </Box>
  );
};

export default Counter;
