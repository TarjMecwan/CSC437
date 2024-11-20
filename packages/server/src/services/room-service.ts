import { RoomModel } from "../models/room";

// Get all rooms
export async function index() {
  return await RoomModel.find();
}

// Get a single room by ID
export async function get(id: string) {
  return await RoomModel.findOne({ id });
}

// Create a new room
export async function create(room: any) {
  const newRoom = new RoomModel(room);
  return await newRoom.save();
}

// Update a room by ID
export async function update(id: string, updatedRoom: any) {
  return await RoomModel.findOneAndUpdate({ id }, updatedRoom, { new: true }).then((room) => {
    if (!room) throw new Error(`${id} not updated`);
    return room;
  });
}

// Delete a room by ID
export async function remove(id: string) {
  return await RoomModel.findOneAndDelete({ id }).then((room) => {
    if (!room) throw new Error(`${id} not deleted`);
  });
}

export default { index, get, create, update, remove };
