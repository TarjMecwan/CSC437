import express from "express";
import path from "path";
import { connect } from "./services/mongo"; // MongoDB connection
import rooms from "./routes/rooms"; // Import the rooms router
import auth from "./routes/auth"; // Import the auth router

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connect("lab10db"); // Ensure this matches your database name

// Middleware
app.use(express.json()); // Parse JSON in request bodies

// Serve static files from the correct uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Log resolved uploads path for debugging
console.log("Resolved uploads path:", path.join(__dirname, "../uploads"));

// Serve static files for the frontend
app.use(express.static(path.join(__dirname, "../../proto/public")));

// Mount the auth router
app.use("/auth", auth); // Add authentication routes

// Mount the rooms router
app.use("/api/rooms", rooms); // Mount the rooms router at /api/rooms

// Catch-all route for serving index.html (frontend)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../proto/public/index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("Serving uploads from:", path.join(__dirname, "../uploads"));
});
