const { body } = require("express-validator");

exports.joinValidation = [

    body("gamePin")
        .trim()
        .isLength({ min: 6, max: 6 })
        .withMessage("Game PIN must contain 6 digits")

];