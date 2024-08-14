const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    createUserProfile
} = require("../controller/detailsController");

//  routes to save the user data in  Database

router.post("/userDetails", auth, createUserProfile);
// router.post(`/proffesion`, auth, userProffesion);

module.exports = router;
