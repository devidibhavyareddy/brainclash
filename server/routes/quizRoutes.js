const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const authorizeRoles = require("../middleware/authorizeRoles");
const validateRequest = require("../middleware/validateRequest");

const { quizValidation } = require("../validators/quizValidator");

const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

// Create Quiz
router.post(
  "/",
  verifyToken,
  authorizeRoles("trainer"),
  quizValidation,
  validateRequest,
  createQuiz
);

// Get My Quizzes
router.get(
  "/my",
  verifyToken,
  authorizeRoles("trainer"),
  getAllQuizzes
);

// Get All Quizzes (optional)
router.get(
  "/",
  verifyToken,
  authorizeRoles("trainer"),
  getAllQuizzes
);

// Get Quiz By ID
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("trainer"),
  getQuizById
);

// Update Quiz
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("trainer"),
  updateQuiz
);

// Delete Quiz
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("trainer"),
  deleteQuiz
);

module.exports = router;