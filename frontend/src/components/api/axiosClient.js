import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: { Authorization: `Bearer ${user.token}` },
});

axiosClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem("user");
  if (raw) {
    let user;
    try {
      user = JSON.parse(raw);
    } catch {
      user = null;
    }
    const token = user?.token;
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;

});

export default axiosClient;