import axios from "axios";
import Cookies from "universal-cookie";

// ** Cookies
const cookie = new Cookies();
const token = cookie.get("userLogged");

const axiosInstance = axios.create({
  baseURL: "http://localhost:9999",
  timeout: 5000,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
