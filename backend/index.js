const express = require("express");
const app = express();
const dotenv = require("dotenv");

// Load environment variables first
dotenv.config();

const dbConnect = require("./config/database.js");
const userRoutes = require("./routes/user.js");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

// Middleware to parse JSON request body
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // http://localhost:3000 OR https://demo.alphabin.co
    credentials: true,
  })
);

// Connect to the database
dbConnect();

// Import routes for user API
app.use("/api", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("<h1>This is the Home Page</h1>");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});
