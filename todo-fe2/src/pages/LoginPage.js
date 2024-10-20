import {
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import TodoContainer from "../components/common/TodoContainer";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled("div")(() => ({
  padding: "2rem",
  width: "600px",
  backgroundColor: "#ffffff88",
  boxShadow: "#00000033 0px 0px 10px",
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [joinedUser, setJoinedUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", { email, password });
      if (res.status === 200) {
        setJoinedUser(res.data.joinedUser);
        sessionStorage.setItem("token", res.data.token);
        api.defaults.headers["authorization"] = "Bearer " + res.data.token;
        setError("");
        navigate("/");
      } else {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
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
      <LoginContainer>
        <LoginTitle>Login</LoginTitle>
        <form onSubmit={handleLogin}>
          <FormControl fullWidth sx={{ mb: "10px" }} error={!!error}>
            <InputLabel htmlFor="login-email-input">Email Address</InputLabel>
            <Input
              id="login-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="email-helper-text"
            />
            <FormHelperText id="email-helper-text">
              Enter your registered email address.
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "10px" }} error={!!error}>
            <InputLabel htmlFor="login-password-input">Password</InputLabel>
            <Input
              id="login-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="password-helper-text"
            />
            <FormHelperText id="password-helper-text">
              Enter your password.
            </FormHelperText>
          </FormControl>

          <LoginButton type="submit">Enter</LoginButton>
          {error && <div>{error}</div>}
        </form>
      </LoginContainer>
    </TodoContainer>
  );
};

export default LoginPage;
