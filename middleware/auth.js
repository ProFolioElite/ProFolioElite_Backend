// src/middleware/auth.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Get the token from the header
  const token = req.header("x-auth-token");

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user from the token to the request object
    req.user = decoded.user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ msg: "Token is not valid." });
  }
};

module.exports = auth;
