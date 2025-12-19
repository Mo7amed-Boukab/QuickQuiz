import api from "./api";

export const getThemes = async () => {
  const response = await api.get("/themes");
  return response.data;
};

export const createTheme = async (themeData) => {
  const response = await api.post("/themes", themeData);
  return response.data;
};

export const deleteTheme = async (id) => {
  const response = await api.delete(`/themes/${id}`);
  return response.data;
};
