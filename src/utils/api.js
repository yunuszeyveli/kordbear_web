// kordbear-web/src/utils/api.js
// Tüm API istekleri buradan yapılır
// Base URL tek yerden yönetilir

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Her istekte token varsa otomatik ekle
api.interceptors.request.use((config) => {
  const user = localStorage.getItem("kordbear_user");
  if (user) {
    const parsed = JSON.parse(user);
    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }
  return config;
});

export default api;
