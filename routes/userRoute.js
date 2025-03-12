const express = require("express");
const router = express.Router();
const { register, login, check } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Route (Only accessible with valid token)
router.get("/check", authMiddleware, check);

module.exports = router;
