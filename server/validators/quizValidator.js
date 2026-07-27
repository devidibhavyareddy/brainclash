const { body } = require("express-validator");

exports.quizValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Quiz title is required")
        .isLength({ min: 3 }),

    body("description")
        .optional()
        .trim(),

    body("duration")
        .isInt({ min: 1 })
        .withMessage("Duration should be at least 1 minute")

];