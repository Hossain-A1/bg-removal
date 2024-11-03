import express from "express";
import { clerkWebhooks, userCredits } from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebhooks);
userRouter.get("/credits", isAuthorized, userCredits);

export default userRouter;
