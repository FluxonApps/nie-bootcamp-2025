import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginBackground from "./components/LoginBackground";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");

    if (token && userRole) {
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [navigate]);

  return (
    <LoginBackground>
      <div className="space-y-8">
        <LoginHeader />
        <LoginForm />
      </div>
    </LoginBackground>
  );
};

export default Index;