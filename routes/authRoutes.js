// src/routes/auth.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  updateTemplateUser
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

// @route post /api/auth
// @ desc post api for updat the template 
router.post('/template',auth,updateTemplateUser)

// logout
router.get("/logout", logoutUser);

module.exports = router;
