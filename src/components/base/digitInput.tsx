import React, { useState, useRef, useEffect } from "react";
import { TextField, Stack } from "@mui/material";
import { toPersianNumber } from "../../utils/toPersianNumber";

interface DigitInputProps {
  count?: number;
}

const DigitInput: React.FC<DigitInputProps> = ({ count = 4 }) => {
  const [code, setCode] = useState(Array(count).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d$/.test(value) && value !== "") return;

    const newCode = [...code];
    newCode[index] = toPersianNumber(value);
    setCode(newCode);

    if (value && index < count - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (code[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Stack
      direction="row-reverse"
      sx={{ gap: 2 }}
    >
      {code.map((digit, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => e.key === "Backspace" && handleBackspace(index)}
          slotProps={{
            htmlInput: {
              maxLength: 1,
              style: { textAlign: "center", fontSize: "24px" },
            },
          }}
          variant="outlined"
          size="small"
          sx={{ width: "60px" }}
        />
      ))}
    </Stack>
  );
};

export default DigitInput;
