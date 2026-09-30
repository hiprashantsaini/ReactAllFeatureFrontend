import axios from "axios";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://react-all-features-backend.vercel.app/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token from localStorage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("rafAccessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response)=>{
        return response
    },
    async (error) =>{
        if(error.response && (error.response.status === 401 || error.response.status === 403)){
            localStorage.removeItem('rafAccessToken');
            window.location.href = "/auth";
        }
        return Promise.reject(error); 
    }
)


export default api;