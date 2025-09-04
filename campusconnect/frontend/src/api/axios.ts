import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8002/api", // replace with your backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
