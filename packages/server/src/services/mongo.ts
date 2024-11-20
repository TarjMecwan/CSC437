// src/services/mongo.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

mongoose.set("debug", true); // Enable debug logging for mongoose

function getMongoURI(dbname: string) {
  let connection_string = `mongodb://localhost:27017/${dbname}`; // Fallback for local DB

  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;

  if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
    // Construct the MongoDB Atlas connection string
    connection_string = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`;
  }

  console.log("Connecting to MongoDB at", connection_string.replace(/:[^@]+@/, ":<password>@")); // Log without exposing password
  return connection_string;
}

export function connect(dbname: string) {
  mongoose
    .connect(getMongoURI(dbname), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
}
