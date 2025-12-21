import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAxios = () => {
  const { auth, refreshAccessToken } = useContext(AuthContext);

  const instance = axios.create();

  instance.interceptors.request.use(async (config) => {
    if (auth?.accessToken) {
      const decoded = jwtDecode(auth.accessToken);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        const newToken = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newToken}`;
      } else {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
    }
    return config;
  });

  return instance;
};