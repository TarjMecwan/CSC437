import mongoose, { Schema, Document } from "mongoose";

// Define the Room interface
export interface Room extends Document {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  availableFrom: string;
  availableTo: string;
  amenities: string[];
  images: string[];
}

// Define the Room schema
const RoomSchema = new Schema<Room>(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    availableFrom: { type: String, required: true },
    availableTo: { type: String, required: true },
    amenities: { type: [String], required: true },
    images: { type: [String], required: true },
  },
  { collection: "rooms" } // Specify the collection name
);

// Create the Room model
export const RoomModel = mongoose.model<Room>("Room", RoomSchema);
