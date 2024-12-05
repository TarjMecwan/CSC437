import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { Credential } from "../models/credential";

// Define the Credential schema
const credentialSchema = new Schema<Credential>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensures usernames are unique
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  { collection: "user_credentials" }
);

// Create the model
const credentialModel = model<Credential>("Credential", credentialSchema);

/**
 * Create a new user credential.
 * @param username - The username to register.
 * @param password - The plain text password to hash and store.
 * @returns A promise that resolves to the created credential.
 */
async function create(username: string, password: string): Promise<Credential> {
  if (!username || !password) {
    throw new Error("Must provide username and password.");
  }

  // Check if the username already exists
  const existingUser = await credentialModel.findOne({ username });
  if (existingUser) {
    throw new Error("Username already exists.");
  }

  // Generate a hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Save the credential
  const newCredential = new credentialModel({ username, hashedPassword });
  return await newCredential.save();
}

/**
 * Verify a user credential.
 * @param username - The username to verify.
 * @param password - The plain text password to check.
 * @returns A promise that resolves to the username if successful.
 */
async function verify(username: string, password: string): Promise<string> {
  const user = await credentialModel.findOne({ username });
  if (!user) {
    throw new Error("Invalid username or password.");
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!isMatch) {
    throw new Error("Invalid username or password.");
  }

  return user.username; // Return the username if verification succeeds
}

// Export the service functions
export default { create, verify };
