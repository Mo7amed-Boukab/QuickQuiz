import { createContext, useState, useContext, useEffect } from "react";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getMe,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await getMe();
          setUser(userData.data);
        } catch (error) {
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (credentials) => {
    const response = await loginService(credentials);
    setUser(response.user);
    return response;
  };

  const register = async (userData) => {
    const response = await registerService(userData);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
