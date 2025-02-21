import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const protectedApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { protectedApi };
