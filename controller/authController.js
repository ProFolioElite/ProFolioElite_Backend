// src/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/userProfileSchema");

// Register user

exports.registerUser = async (req, res) => {
  const { name, email, password, profession, template } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password, profession, template });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// controller for adding user slected template

exports.updateTemplateUser = async (req, res) => {
  const { templateName, _id, email } = req.body;

  // Debug logs for input validation
  console.log(
    "templateName --->",
    templateName,
    "this userEmail_----->",
    email,
    "UserId --->",
    _id
  );

  try {
    // Validate the input fields
    if (!templateName || !email) {
      return res
        .status(400)
        .json({ error: "templateName and _id are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      console.log(user);
    }

    // Update the user's template in the database
    const result = await User.updateOne(
      { email }, // Match the user by _id
      { $set: { template: templateName } } // Update the template field
    );
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "User not found or template not updated" });
    }

    const updatedUser = await User.findOne({ email });
    if (updatedUser) {
      res
        .status(200)
        .json({ message: "Template updated successfully", data: updatedUser });
    }

    // Check if the update was successful
  } catch (error) {
    console.error("Error updating template:", error.message);

    // Respond with a proper error message
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    console.log(user.password);
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// logout
exports.logoutUser = async (req, res) => {
  // Assuming you're using a token-based authentication system,
  // the logout process can simply mean invalidating the token on the client-side.
  // Since JWTs are stateless and don't require server-side session management,
  // you can inform the client to remove the token.

  res.json({ msg: "User logged out successfully" });
};

// set profession

exports.setPorfession = async (req, res) => {
  const { _id, profession } = req.body;
  try {
    const update = await User.updateOne(
      { _id: _id },
      { $set: { profession: profession } }
    );
    if (update) {
      res.json({ msg: "profession updated" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
