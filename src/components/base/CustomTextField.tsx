import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)<TextFieldProps>(({}) => ({
  "& label": {
    transformOrigin: "right",
    left: "inherit",
    right: "2rem",
    top: "-0.2rem",
    fontSize: "18px",
    fontWeight: 600,
    overflow: "unset",
  },
  "& legend": {
    textAlign: "right",
    display: "flex",
    justifyContent: "center",
    fontSize: "16px",
  },
  "& p": {
    textAlign: "right",
  },
}));

export default CustomTextField;
