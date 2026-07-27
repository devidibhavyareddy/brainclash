import api from "./api";

// Start Quiz Session
export const startQuiz = async (quizId) => {
  const { data } = await api.post("/sessions/start", {
    quizId,
  });
  return data;
};

// Join Quiz
export const joinQuiz = async (gamePin) => {
  const { data } = await api.post("/sessions/join", {
    gamePin,
  });
  return data;
};

// Get Waiting & Approved Students
export const getWaitingStudents = async (sessionId) => {
  const { data } = await api.get(`/sessions/waiting/${sessionId}`);
  return data;
};

// Approve Student
export const approveStudent = async (sessionId, studentId) => {
  const { data } = await api.post("/sessions/approve", {
    sessionId,
    studentId,
  });
  return data;
};

// Reject Student
export const rejectStudent = async (sessionId, studentId) => {
  const { data } = await api.post("/sessions/reject", {
    sessionId,
    studentId,
  });
  return data;
};

// Start Live Quiz
export const startLiveQuiz = async (sessionId) => {
  const { data } = await api.post("/sessions/live", {
    sessionId,
  });
  return data;
};

// End Quiz
export const endQuiz = async (sessionId) => {
  const { data } = await api.post("/sessions/end", {
    sessionId,
  });
  return data;
};

// Get Leaderboard
export const getLeaderboard = async (sessionId) => {
  const { data } = await api.get(`/sessions/leaderboard/${sessionId}`);
  return data;
};

// Get Student Result
export const getStudentResult = async (sessionId) => {
  const { data } = await api.get(`/sessions/result/${sessionId}`);
  return data;
};