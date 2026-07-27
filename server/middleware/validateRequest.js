const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array()[0];

        return res.status(400).json({
            success: false,
            message: firstError?.msg || "Validation failed",
            errors: errors.array()
        });

    }

    next();

};

module.exports = validateRequest;