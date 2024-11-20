import { Schema, model } from "mongoose";

interface Room {
  id: string;
  title: string;
  location: string;
  price: number;
  availableFrom: Date;
  availableTo: Date;
  description: string;
  amenities: string[];
  images: string[];
}

const RoomSchema = new Schema<Room>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  availableFrom: { type: Date, required: true },
  availableTo: { type: Date, required: true },
  description: { type: String, required: true },
  amenities: { type: [String], required: true },
  images: { type: [String], required: true },
});

export const RoomModel = model<Room>("Room", RoomSchema);
