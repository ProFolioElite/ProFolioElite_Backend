// src/routes/auth.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} = require("../controller/authController");

// @route   POST /api/auth/register
// @desc    Register user
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login user
router.post("/login", loginUser);

// @route   GET /api/auth
// @desc    Get logged in user
router.get("/getUser", auth, getUser);

// logout
router.get("/logout", logoutUser);

module.exports = router;
