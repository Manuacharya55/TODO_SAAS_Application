import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import tasksRouter from "./routes/task.route.js";
import { globalErrorHandler } from "./utils/GlobalError.js";

// Initialize dotenv
// dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors()
);

// Handle CORS preflight BEFORE routes (so validateJWT never sees OPTIONS requests)
app.options(/\/.*/, cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", tasksRouter);

app.use(globalErrorHandler)
// Use the PORT from .env, or fallback to 4000 if it's missing
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});