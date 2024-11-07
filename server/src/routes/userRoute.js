import express from "express";
import {
  clerkWebhooks,
  paymentStripe,
  userCredits,
} from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebhooks);
userRouter.post("/pay",isAuthorized, paymentStripe);
userRouter.get("/credits", isAuthorized, userCredits);

export default userRouter;
