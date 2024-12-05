import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import Rooms from "../services/room-service"; // Import the service layer
import { authenticateUser } from "./auth"; // Import the authentication middleware
import { Room } from "../models/room"; // Import the Room model interface

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads", // Directory to store images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Serve the uploaded images
router.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// Image upload endpoint
router.post("/upload", authenticateUser, upload.single("image"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Return the file path to the client
  const filePath = `/uploads/${req.file.filename}`;
  res.status(200).json({ path: filePath });
});

// Get all rooms
router.get("/", (_, res: Response) => {
  Rooms.index()
    .then((list: Room[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

// Get a specific room by ID
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Rooms.get(id)
    .then((room: Room | null) => {
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.json(room);
    })
    .catch((err) => res.status(500).send(err));
});

// Create a new room
router.post("/", authenticateUser, (req: Request, res: Response) => {
  const newRoom = req.body;

  Rooms.create(newRoom)
    .then((room: Room) => res.status(201).json(room))
    .catch((err) => {
      console.error("Error creating room:", err);
      res.status(500).json({ error: "Failed to create room", details: err.message });
    });
});

// Update a room
router.put("/:id", authenticateUser, (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedRoom = req.body;

  Rooms.update(id, updatedRoom)
    .then((room: Room | null) => {
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.json(room);
    })
    .catch((err) => {
      console.error("Error updating room:", err);
      res.status(500).json({ error: "Failed to update room", details: err.message });
    });
});

// Delete a room
router.delete("/:id", authenticateUser, (req: Request, res: Response) => {
  const { id } = req.params;

  Rooms.remove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.status(204).end();
    })
    .catch((err) => {
      console.error("Error deleting room:", err);
      res.status(500).json({ error: "Failed to delete room", details: err.message });
    });
});

export default router;
