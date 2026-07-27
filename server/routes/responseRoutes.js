const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
    submitResponse,
    getMyResults
} = require("../controllers/responseController");

router.post("/", verifyToken, submitResponse);

router.get("/my-results", verifyToken, getMyResults);

module.exports = router;