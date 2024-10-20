import { Button } from "@mui/material";
import styled from "@emotion/styled";

const TodoButton = styled(Button)(() => ({
  width: "100%",
  height: "100%",
  fontSize: "1rem",
  padding: "0.1rem",
  border: "none",
  boxShadow: "#e07368 1px 1px 3px",
  color: "#fff",
  backgroundColor: "#e07368",
  "&:hover": { backgroundColor: "salmon", color: "#fff" },
  "@media(max-width:900px)": { fontSize: "0.8rem" },
}));

export default TodoButton;
