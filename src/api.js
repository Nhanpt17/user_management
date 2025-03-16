import axios from "axios";



const API = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL_LOCAL
      : process.env.REACT_APP_API_URL_PROD,
  headers: { "Content-Type": "application/json" },
});



export default API;
