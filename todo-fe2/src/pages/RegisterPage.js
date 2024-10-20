import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import TodoContainer from "../components/common/TodoContainer";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const RegisterContainer = styled("div")(() => ({
  padding: "2rem",
  width: "600px",
  backgroundColor: "#ffffff88",
  boxShadow: "#00000033 0px 0px 10px",
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("패스워드가 일치하지 않습니다");
      }
      const res = await api.post("/user", { name, email, password });
      if (res.status === 200) {
        navigate("/login");
      } else {
        alert(error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: "10px" }}>
            <InputLabel htmlFor="register-name-input">Name</InputLabel>
            <Input
              id="register-name-input"
              onChange={(e) => setName(e.target.value)}
              aria-describedby="register-name-helper-text"
              required
            />
            <FormHelperText id="register-name-helper-text">
              Please enter your full name
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "10px" }}>
            <InputLabel htmlFor="register-email-input">
              Email Address
            </InputLabel>
            <Input
              id="register-email-input"
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="register-email-helper-text"
              required
            />
            <FormHelperText id="register-email-helper-text">
              Enter a valid email address
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "10px" }}>
            <InputLabel htmlFor="register-password-input">Password</InputLabel>
            <Input
              type="password"
              id="register-password-input"
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="register-password-helper-text"
              required
            />
            <FormHelperText id="register-password-helper-text">
              Choose a secure password
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "10px" }}>
            <InputLabel htmlFor="register-confirm-password-input">
              Confirm Password
            </InputLabel>
            <Input
              type="password"
              id="register-confirm-password-input"
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-describedby="register-confirm-password-helper-text"
              required
            />
            <FormHelperText id="register-confirm-password-helper-text">
              Re-enter your password
            </FormHelperText>
          </FormControl>

          <RegisterButton type="submit">Join Account</RegisterButton>
          {error && <div>{error}</div>}
        </form>
      </RegisterContainer>
    </TodoContainer>
  );
};

export default RegisterPage;
