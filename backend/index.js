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
    origin: ["https://demo.alphabin.co", "http://localhost:3000", "http://backend.demo.alphabin.co"],
    credentials: true,
  })
);

// Connect to the database
dbConnect();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API routes should be handled first
app.use("/api", userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle all other routes by sending back index.html
app.get('*', (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});
