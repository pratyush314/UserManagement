import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../services/auth";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const token = await login(email, password);
      if (!token) {
        setError("Login Failed. Try Again !");
        return;
      }
      localStorage.setItem("authToken", token);
      navigate("/users");
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return <LoginForm onSubmit={handleLogin} error={error} loading={loading} />;
};

export default LoginPage;
