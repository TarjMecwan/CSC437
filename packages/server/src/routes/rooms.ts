import express, { Request, Response } from "express";
import Rooms from "../services/room-service"; // Import the service layer
import { Room } from "../models/room"; // Import the Room model interface

const router = express.Router();

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

// Create a new room
router.post("/", (req: Request, res: Response) => {
  const newRoom = req.body;

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
