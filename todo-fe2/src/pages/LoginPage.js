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
  "@media(max-width: 767px)": {
    width: "80%",
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

const LoginInput = styled(Input)(() => ({
  fontFamily: `"Dongle", sans-serif`,
  fontSize: "1.7rem",
  "&::after": {
    borderBottom: "2px solid salmon",
  },
  "&::before": {
    borderBottom: "1px solid #ddd",
  },
  "&:hover::before": {
    borderBottom: "1px solid #e07368 !important",
  },
}));

const LoginLabel = styled(InputLabel)(() => ({
  fontFamily: `"Agdasima", sans-serif`,
  fontSize: "1.3rem",
  "&.Mui-focused": {
    color: "salmon",
  },
}));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [joinedUser, setJoinedUser] = useState(null);
  const [focusedField, setFocusedField] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", {
        email: email,
        password: password,
      });
      if (res.status === 200) {
        setJoinedUser(res.data.joinedUser);
        sessionStorage.setItem("token", res.data.token);
        api.defaults.headers["authorization"] = "Bearer " + res.data.token;
        setError("");
        navigate("/");
      } else {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <TodoContainer
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {error && <p>{error}</p>}
      <LoginContainer>
        <LoginTitle>Login</LoginTitle>
        <form onSubmit={handleLogin}>
          <FormControl fullWidth sx={{ mb: "10px" }}>
            <LoginLabel htmlFor="login-email-input">Email Address</LoginLabel>
            <LoginInput
              id="login-email-input"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              aria-describedby="login-email-helper-text"
              required
            />
            <FormHelperText
              id="login-email-helper-text"
              sx={{
                color: focusedField === "email" ? "salmon" : "#fff",
              }}
            >
              Enter a valid email address
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "10px" }}>
            <LoginLabel htmlFor="login-password-input">Password</LoginLabel>
            <LoginInput
              type="password"
              id="login-password-input"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              aria-describedby="login-password-helper-text"
              required
            />
            <FormHelperText
              id="Login-password-helper-text"
              sx={{
                color: focusedField === "password" ? "salmon" : "#fff",
              }}
            >
              Choose a secure password
            </FormHelperText>
          </FormControl>

          <LoginButton type="submit">Join Account</LoginButton>
        </form>
      </LoginContainer>
    </TodoContainer>
  );
};

export default LoginPage;
