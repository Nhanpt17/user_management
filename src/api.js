import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
//   headers: { "Content-Type": "application/json" },
// });

const API = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000/api" // URL local
      : "https://user-management-be-appk.onrender.com/api", // URL trên Render
  headers: { "Content-Type": "application/json" },
});

export default API;
