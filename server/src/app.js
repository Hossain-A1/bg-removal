import "dotenv/config";
import express from "express";
import xssClean from "xss-clean";
import rateLimit from "express-rate-limit";
import cors from "cors";
import morgan from "morgan";
import createHttpError from "http-errors";
import { errorResponse } from "./controllers/responseController.js";
import userRouter from "./userRoute.js";

const app = express();
// Trust proxies (required for rate limiting to work correctly on Vercel)
app.set("trust proxy", 1);

const reqLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: "Too many requests from this API, please try again after 1 minute",
});

// Middlewares
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(morgan("dev"));
app.use(reqLimit);
app.use(xssClean());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test successful" });
});

app.use("/api/user", userRouter);

// Auth routes (make sure this comes before the 404 handler)

// 404 Error handler (Route not found)
app.use((req, res, next) => {
  next(createHttpError(404, { message: "Route not found!" }));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  return errorResponse(res, {
    statusCode: err.status || 500,
    message: err.message,
  });
});

export default app;
