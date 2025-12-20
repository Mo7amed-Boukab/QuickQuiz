import api from "./api";

export const submitQuiz = async (quizData) => {
  const response = await api.post("/quiz/submit", quizData);
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get("/quiz/history");
  return response.data;
};

export const getMyHistory = async () => {
  const response = await api.get("/quiz/my-history");
  return response.data;
};

export const getQuizStats = async () => {
  const response = await api.get("/quiz/stats");
  return response.data;
};
