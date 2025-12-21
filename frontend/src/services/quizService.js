import api from "./api";

export const getQuizzes = async () => {
  const response = await api.get("/quiz");
  return response.data;
};

export const createQuiz = async (quizData) => {
  const response = await api.post("/quiz", quizData);
  return response.data;
};

export const updateQuiz = async (id, quizData) => {
  const response = await api.put(`/quiz/${id}`, quizData);
  return response.data;
};

export const deleteQuiz = async (id) => {
  const response = await api.delete(`/quiz/${id}`);
  return response.data;
};

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

export const getLeaderboard = async () => {
  const response = await api.get("/quiz/leaderboard");
  return response.data;
};
