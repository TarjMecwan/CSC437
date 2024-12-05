import { Schema, model } from "mongoose";
import { Room } from "../models/room"; // Import the Room interface

// Define the Room schema
const RoomSchema = new Schema<Room>({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  availableFrom: { type: Date, required: true },
  availableTo: { type: Date, required: true },
  description: { type: String },
  amenities: [String],
  images: [String], // Store image paths or base64-encoded data
});


// Create the Room model
const RoomModel = model<Room>("Room", RoomSchema);

// Service functions for CRUD operations
export default {
  index: async () => {
    try {
      return await RoomModel.find().exec();
    } catch (err) {
      throw new Error(`Failed to fetch rooms: ${err.message}`);
    }
  },
  get: async (id) => {
    try {
      return await RoomModel.findById(id).exec();
    } catch (err) {
      throw new Error(`Failed to fetch room with ID ${id}: ${err.message}`);
    }
  },
  create: async (room) => {
    try {
      return await new RoomModel(room).save();
    } catch (err) {
      throw new Error(`Failed to create room: ${err.message}`);
    }
  },
  update: async (id, room) => {
    try {
      return await RoomModel.findByIdAndUpdate(id, room, { new: true }).exec();
    } catch (err) {
      throw new Error(`Failed to update room with ID ${id}: ${err.message}`);
    }
  },
  remove: async (id) => {
    try {
      return await RoomModel.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new Error(`Failed to delete room with ID ${id}: ${err.message}`);
    }
  },
};
