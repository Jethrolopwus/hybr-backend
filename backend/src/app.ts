import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import assessmentRoutes from "./routes/assesmentRoute";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", assessmentRoutes);
// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
