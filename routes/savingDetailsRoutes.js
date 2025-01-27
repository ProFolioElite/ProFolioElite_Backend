const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createUserProfile,
  getUserProfileDetails,
} = require("../controller/detailsController");
// const upload = require("../utils/uplode");

const multer = require("multer");
const path = require("path");

const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the dynamically created directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// In route definition:
router.post("/userDetails", upload.single("profilePhoto"), createUserProfile);

router.post("/getuserdetails", auth, getUserProfileDetails);

module.exports = router;
