import api from "./api";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const logout = async () => {
  try {
    await api.get("/auth/logout");
  } finally {
    localStorage.removeItem("token");
  }
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await api.put("/auth/profile", userData);
  return response.data;
};
