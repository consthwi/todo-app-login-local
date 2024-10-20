import { Button, FormControl, styled } from "@mui/material";
import React from "react";
import TodoContainer from "../components/common/TodoContainer";

const LoginContainer = styled("div")(() => ({
  padding: "2rem",
  width: "600px",
  backgroundColor: "#ffffff88",
  boxShadow: "#00000033 0px 0px 10px",
}));

const LoginInput = styled("input")(() => ({
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

const LoginTitle = styled("h1")(() => ({
  marginTop: "0",
  textAlign: "center",
}));

const LoginButton = styled(Button)(() => ({
  marginTop: "20px",
  fontSize: "1rem",
  width: "100%",
  color: "#fff",
  backgroundColor: "#e07368",
  "&:hover": { backgroundColor: "salmon", color: "#fff" },
}));

const LoginPage = () => {
  return (
    <TodoContainer
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoginContainer>
        <LoginTitle>Login</LoginTitle>
        <form>
          <FormControl fullWidth sx={{ mb: "10px" }}>
            <label for={"login-email-input"}>Email Adress</label>
            <LoginInput id={"login-email-input"} />
          </FormControl>
          <FormControl fullWidth sx={{ mb: "10px" }}>
            <label for={"login-password-input"}>Password</label>
            <LoginInput id={"login-password-input"} />
          </FormControl>
        </form>
        <LoginButton>Enter</LoginButton>
      </LoginContainer>
    </TodoContainer>
  );
};

export default LoginPage;
