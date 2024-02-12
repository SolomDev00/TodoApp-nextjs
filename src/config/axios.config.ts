import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9999",
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
