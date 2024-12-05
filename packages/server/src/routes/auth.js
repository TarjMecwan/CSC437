import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import credentials from "../services/credential-svc";

dotenv.config();

const router = express.Router();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "NOT_A_SECRET";

// Function to generate a JWT token
function generateAccessToken(username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username },
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token as string);
      }
    );
  });
}

// Middleware to authenticate users based on the JWT token
export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).end(); // Unauthorized
    return;
  }

  jwt.verify(token, TOKEN_SECRET, (err) => {
    if (err) {
      res.status(403).end(); // Forbidden
    } else {
      next();
    }
  });
}

// Register route
router.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Invalid input data.");
    return;
  }

  credentials
    .create(username, password)
    .then((creds) => generateAccessToken(creds.username))
    .then((token) => res.status(201).send({ token }))
    .catch((err) => res.status(400).send(err));
});

// Login route
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Invalid input data.");
    return;
  }

  credentials
    .verify(username, password)
    .then((goodUser) => generateAccessToken(goodUser))
    .then((token) => res.status(200).send({ token }))
    .catch(() => res.status(401).send("Unauthorized"));
});

export default router;
