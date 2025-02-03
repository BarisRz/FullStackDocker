import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const publicApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
export { publicApi };
