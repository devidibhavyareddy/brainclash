const express = require("express");

const router = express.Router();
const validateRequest = require("../middleware/validateRequest");

const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

const {
  getProfile,
  register,
  login,
} = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

router.post(
    "/register",
    registerValidation,
    validateRequest,
    register
);
router.post(
    "/login",
    loginValidation,
    validateRequest,
    login
);
router.get("/profile", verifyToken, getProfile);

module.exports = router;