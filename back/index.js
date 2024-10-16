require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRouter");
const connection = require("./db/ConnectionDb");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use("/uploads", express.static("uploads"));

// Database Connection
connection();

// Routes
app.use("/api/auth", authRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Start Server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}...`));
