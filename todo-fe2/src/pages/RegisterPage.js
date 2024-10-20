import { Button, FormControl, styled } from "@mui/material";
import React from "react";
import TodoContainer from "../components/common/TodoContainer";

const RegisterContainer = styled("div")(() => ({
  padding: "2rem",
  width: "600px",
  backgroundColor: "#ffffff88",
  boxShadow: "#00000033 0px 0px 10px",
}));

const RegisterInput = styled("input")(() => ({
  border: "1px solid #e07368",
  fontSize: "1.3rem",
  outline: "none",
  color: "#333",
  fontFamily: "Dongle",
  backgroundColor: "#ffffff99",
  "&:focus": {
    backgroundColor: "#e0736822",
  },
}));

const RegisterTitle = styled("h1")(() => ({
  marginTop: "0",
  textAlign: "center",
}));

const RegisterButton = styled(Button)(() => ({
  marginTop: "20px",
  fontSize: "1rem",
  width: "100%",
  color: "#fff",
  backgroundColor: "#e07368",
  "&:hover": { backgroundColor: "salmon", color: "#fff" },
}));

const RegisterPage = () => {
  return (
    <TodoContainer
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <RegisterContainer>
        <RegisterTitle>Register</RegisterTitle>
        <form>
          <FormControl fullWidth sx={{ mb: "10px" }}>
            <label for={"register-name-input"}>Name</label>
            <RegisterInput id={"register-name-input"} />
          </FormControl>
          <FormControl fullWidth sx={{ mb: "10px" }}>
            <label for={"register-email-input"}>Email Adress</label>
            <RegisterInput id={"register-email-input"} />
          </FormControl>
          <FormControl fullWidth sx={{ mb: "10px" }}>
            <label for={"register-password-input"}>Password</label>
            <RegisterInput id={"register-password-input"} />
          </FormControl>
          <FormControl fullWidth sx={{ mb: "10px" }}>
            <label for={"register-confirm-password-input"}>
              Confirm Password
            </label>
            <RegisterInput id={"register-confirm-password-input"} />
          </FormControl>
        </form>
        <RegisterButton>Join Account</RegisterButton>
      </RegisterContainer>
    </TodoContainer>
  );
};

export default RegisterPage;
