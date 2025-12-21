// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
 

  const login = (accessToken, refreshToken) => {
    const decoded = jwtDecode(accessToken);
    setAuth({ accessToken, refreshToken, role: decoded.role, email: decoded.sub });
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setAuth(null);
    localStorage.clear();
  };

  // 🔄 Refresh token function
  const refreshAccessToken = async () => {
    try {
      const res = await axios.post("http://localhost:8080/auth/refresh", {
        refreshToken: auth.refreshToken,
      });
      login(res.data.accessToken, res.data.refreshToken);
      return res.data.accessToken;
    } catch (err) {
      logout();
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};