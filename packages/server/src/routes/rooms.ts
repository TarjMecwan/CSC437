import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import Rooms from "../services/room-service"; // Import the service layer
import { Room } from "../models/room"; // Import the Room model interface

const router = express.Router();

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // Save files to /uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Add timestamp to file name
  },
});

const upload = multer({ storage });

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
    .then((room: Room) => res.json(room))
    .catch((err) => res.status(404).send(err));
});

// Create a new room with image uploads
router.post("/", upload.array("images"), (req: Request, res: Response) => {
  const images = req.files
    ? (req.files as Express.Multer.File[]).map((file) => {
        const path = `/uploads/${file.filename}`;
        console.log("Uploaded File Path:", path); // Logs the relative path
        console.log("Absolute File Path:", file.path); // Logs the full server path
        return path;
      })
    : [];
  const newRoom = { ...req.body, images };

  Rooms.create(newRoom)
    .then((room: Room) => res.status(201).json(room))
    .catch((err) => res.status(500).send(err));
});


// Update a room
router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedRoom = req.body;

  Rooms.update(id, updatedRoom)
    .then((room: Room) => res.json(room))
    .catch((err) => res.status(404).send(err));
});

// Delete a room
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Rooms.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
