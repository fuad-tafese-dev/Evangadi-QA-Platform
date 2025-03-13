import axios from "axios";

const api = axios.create({
    baseURL: "https://your-backend.onrender.com/api", // Use Render backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
