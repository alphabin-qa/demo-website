const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require('path');

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
    origin: "https://demo.alphabin.co", // http://localhost:3000 OR https://demo.alphabin.co
    credentials: true,
  })
);

// Connect to the database
dbConnect();

// Import routes for user API
app.use("/api", userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Default route
app.get("/", (req, res) => {
  res.send("<h1>This is the Home Page</h1>");
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});
