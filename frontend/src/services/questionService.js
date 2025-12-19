import api from "./api";

export const getQuestions = async (themeId = null) => {
  const url = themeId ? `/questions?themeId=${themeId}` : "/questions";
  const response = await api.get(url);
  return response.data;
};

export const createQuestion = async (questionData) => {
  const response = await api.post("/questions", questionData);
  return response.data;
};

export const updateQuestion = async (id, questionData) => {
  const response = await api.put(`/questions/${id}`, questionData);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await api.delete(`/questions/${id}`);
  return response.data;
};
