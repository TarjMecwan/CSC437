import express, { Request, Response } from "express";
import path from "path";
import { connect } from "./services/mongo";
import { getAllRooms, getRoomById, createRoom, deleteRoom } from "./services/room-service";

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
connect("lab10db");

// Serve static files
app.use(express.static(path.join(__dirname, "../../proto/public")));

// API: Get all rooms
app.get("/api/rooms", async (req: Request, res: Response) => {
  const rooms = await getAllRooms();
  res.json(rooms);
});

// API: Get a room by ID
app.get("/api/rooms/:id", async (req: Request, res: Response) => {
  const room = await getRoomById(req.params.id);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  res.json(room);
});

// API: Create a new room
app.post("/api/rooms", async (req: Request, res: Response) => {
  const newRoom = await createRoom(req.body);
  res.status(201).json(newRoom);
});

// API: Delete a room by ID
app.delete("/api/rooms/:id", async (req: Request, res: Response) => {
  const result = await deleteRoom(req.params.id);
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Room not found" });
  }
  res.status(204).send();
});

// Catch-all route for frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../proto/public/index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
