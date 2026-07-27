import api from "./api";

// Add Question
export const addQuestion = async (questionData) => {
  const { data } = await api.post("/questions", questionData);
  return data;
};

// Get Questions by Quiz
export const getQuestions = async (quizId) => {
  const { data } = await api.get(`/questions/${quizId}`);
  return data;
};

// Update Question
export const updateQuestion = async (questionId, questionData) => {
  const { data } = await api.put(`/questions/${questionId}`, questionData);
  return data;
};

// Delete Question
export const deleteQuestion = async (questionId) => {
  const { data } = await api.delete(`/questions/${questionId}`);
  return data;
};