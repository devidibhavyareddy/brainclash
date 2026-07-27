import api from "./api";

// Create Quiz
export const createQuiz = async (quizData) => {
  const { data } = await api.post("/quizzes", quizData);
  return data;
};

// Get Logged-in Trainer's Quizzes
export const getMyQuizzes = async () => {
  const { data } = await api.get("/quizzes/my");
  return data;
};

// Get Quiz by ID
export const getQuizById = async (quizId) => {
  const { data } = await api.get(`/quizzes/${quizId}`);
  return data;
};

// Update Quiz
export const updateQuiz = async (quizId, quizData) => {
  const { data } = await api.put(`/quizzes/${quizId}`, quizData);
  return data;
};

// Delete Quiz
export const deleteQuiz = async (quizId) => {
  const { data } = await api.delete(`/quizzes/${quizId}`);
  return data;
};