const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnect = require("./config/database.js");
const userRoutes = require("./routes/user");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON request body
app.use(express.json());

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
