const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const authorizeRoles = require("../middleware/authorizeRoles");
const validateRequest = require("../middleware/validateRequest");
const {
    questionValidation
} = require("../validators/questionValidator");

const {
    addQuestion,
    submitAnswer,
    getQuestionsByQuiz
} = require("../controllers/questionController");

router.post(
    "/",
    verifyToken,
    authorizeRoles("trainer"),
    questionValidation,
    validateRequest,
    addQuestion
);

router.get(
    "/:quizId",
    verifyToken,
    authorizeRoles("trainer"),
    getQuestionsByQuiz
);

router.post(
    "/submit-answer",
    verifyToken,
    authorizeRoles("student"),
    submitAnswer
);

module.exports = router;