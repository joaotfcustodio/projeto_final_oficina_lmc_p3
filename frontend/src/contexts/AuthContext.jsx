import { createContext, useContext, useState } from "react";
import AuthService from "../services/auth.service";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (email, password) => {
    const res = await AuthService.login(email, password);
    setToken(res.AccessToken);
  };

  const register = async (nome, email, password) => {
    const res = await AuthService.register(nome, email, password);
    return res;
  };

  const logout = () => {
    AuthService.logout();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
