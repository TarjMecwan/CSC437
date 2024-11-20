import express from "express";
import path from "path";
import { connect } from "./services/mongo"; // MongoDB connection
import rooms from "./routes/rooms"; // Import the rooms router

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connect("lab10db"); // Replace "lab10db" with your database name if different

// Middleware
app.use(express.json()); // Parse JSON in request bodies
app.use(express.static(path.join(__dirname, "../../proto/public"))); // Serve static files

// Routes
app.use("/api/rooms", rooms); // Mount the rooms router at /api/rooms

// Catch-all route for frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../proto/public/index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
