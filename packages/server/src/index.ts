import express from "express";
import path from "path";
import { connect } from "./services/mongo"; // MongoDB connection
import rooms from "./routes/rooms"; // Import the rooms router
import auth, { authenticateUser } from "./routes/auth"; // Import auth routes and middleware

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connect("lab10db"); // Ensure this matches your database name

// Middleware
app.use(express.json()); // Parse JSON in request bodies
app.use(express.static(path.join(__dirname, "../../proto/public"))); // Serve static files

// Routes
app.use("/auth", auth); // Mount the auth router at /auth
app.use("/api/rooms", authenticateUser, rooms); // Protect /api/rooms routes with authentication

// Catch-all route for frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../proto/public/index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
