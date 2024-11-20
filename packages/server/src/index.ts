import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

// Path to your static frontend files in proto/public
const staticDir = path.join(__dirname, "../../proto/public");

// Serve static files (index.html, CSS, JS, images)
app.use(express.static(staticDir));

// Dynamic route to demonstrate backend functionality
app.get("/api/hello", (req: Request, res: Response) => {
    res.json({ message: "Hello from the backend!" });
});

// Catch-all route to serve index.html for any unknown routes
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(staticDir, "index.html"));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
