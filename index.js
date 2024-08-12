const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const savingDetails = require("./routes/savingDetailsRoutes");
const template = require("./routes/templetes");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api", savingDetails);
app.use("/templete", template);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
