const { body } = require("express-validator");

exports.questionValidation = [

    body("questionText")
        .trim()
        .notEmpty()
        .withMessage("Question is required"),

    body("options")
        .isArray({ min: 4, max: 4 })
        .withMessage("Exactly four options are required"),

    body("correctAnswer")
        .isInt({ min: 0, max: 3 })
        .withMessage("Correct answer must be between 0 and 3"),

    body("marks")
        .isInt({ min: 1 })
        .withMessage("Marks should be at least 1"),

    body("timeLimit")
        .isInt({ min: 5 })
        .withMessage("Time limit should be at least 5 seconds")

];