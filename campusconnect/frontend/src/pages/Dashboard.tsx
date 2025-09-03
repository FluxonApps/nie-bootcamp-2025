import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/dashboard"); 
        setMessage(res.data.message);
      } catch (err: any) {
        setMessage(err.response?.data?.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
