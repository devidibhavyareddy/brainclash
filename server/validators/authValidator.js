const { body } = require("express-validator");

exports.registerValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must contain at least 3 characters"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Enter a valid email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters"),

    body("role")
        .isIn(["trainer", "student"])
        .withMessage("Invalid role")

];

exports.loginValidation = [

    body("email")
        .isEmail()
        .withMessage("Enter valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password required")

];