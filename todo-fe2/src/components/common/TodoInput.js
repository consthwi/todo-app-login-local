import { TextField } from "@mui/material";
import styled from "@emotion/styled";

const TodoInput = styled(TextField)(() => ({
  color: "#8c7967",
  transition: "0.3s all",
  backgroundColor: "#ffffff11",
  borderRadius: "5px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#cccccc",
      zIndex: "-1",
    },
    "&:hover fieldset": {
      borderColor: "#e07368",
      background: "#ffffff88",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e07368",
      background: "#ffffff88",
    },
  },
}));

export default TodoInput;
