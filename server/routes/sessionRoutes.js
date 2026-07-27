const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const authorizeRoles = require("../middleware/authorizeRoles");
const validateRequest = require("../middleware/validateRequest");

const { joinValidation } = require("../validators/sessionValidator");

const {
  startQuiz,
  joinQuiz,
  getWaitingStudents,
  approveStudent,
  rejectStudent,
  startLiveQuiz,
  endQuiz,
  getStudentResult,
  getLeaderboard,
} = require("../controllers/sessionController");

// =====================
// Trainer Routes
// =====================

// Start Quiz
router.post(
  "/start",
  verifyToken,
  authorizeRoles("trainer"),
  startQuiz
);

// Waiting Students
router.get(
  "/waiting/:sessionId",
  verifyToken,
  authorizeRoles("trainer"),
  getWaitingStudents
);

// Approve Student
router.post(
  "/approve",
  verifyToken,
  authorizeRoles("trainer"),
  approveStudent
);

// Reject Student
router.post(
  "/reject",
  verifyToken,
  authorizeRoles("trainer"),
  rejectStudent
);

// Start Live Quiz
router.post(
  "/live",
  verifyToken,
  authorizeRoles("trainer"),
  startLiveQuiz
);

// End Quiz
router.post(
  "/end",
  verifyToken,
  authorizeRoles("trainer"),
  endQuiz
);

// Leaderboard
router.get(
  "/leaderboard/:sessionId",
  verifyToken,
  authorizeRoles("trainer"),
  getLeaderboard
);

// =====================
// Student Routes
// =====================

// Join Quiz
router.post(
  "/join",
  verifyToken,
  authorizeRoles("student"),
  joinValidation,
  validateRequest,
  joinQuiz
);

// Result
router.get(
  "/result/:sessionId",
  verifyToken,
  authorizeRoles("student"),
  getStudentResult
);

module.exports = router;