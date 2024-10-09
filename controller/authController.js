// src/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  const { _id, template } = req.body;
  try {
    let user = await User.updateOne(
      { _id: _id },
      { $set: { template: template } }
    );
    res.status(200).json({ msg: `${user} template added` });
  } catch (error) {
    res.status(500).json(error);
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
