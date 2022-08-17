import axios from "axios";
import Cookies from "js-cookie";

const httpRequest = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

httpRequest.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${getToken()}`;
  return config;
});

const getToken = () => {
  return Cookies.get("token");
};

export default httpRequest;
