import { RoomModel } from "../models/room";

// Get all rooms
export async function getAllRooms() {
  return await RoomModel.find();
}

// Get a single room by ID
export async function getRoomById(id: string) {
  return await RoomModel.findOne({ id });
}

// Create a new room
export async function createRoom(room: any) {
  const newRoom = new RoomModel(room);
  return await newRoom.save();
}

// Delete a room by ID
export async function deleteRoom(id: string) {
  return await RoomModel.deleteOne({ id });
}
