import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import { clerk_webhook_secret } from "../secret.js";
import { successResponse } from "./responseController.js";

// Endpoint: api/user/webhooks
const clerkWebhooks = async (req, res, next) => {
  try {
    const whook = new Webhook(clerk_webhook_secret);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    // Respond immediately to Clerk
    res.status(200).json({ message: "Processing webhook event" });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.create(userData);
        return successResponse(res, {statusCode:201, message: "User created successfully" });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        return successResponse(res, {statusCode:200, message: "User updated successfully" });
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        return successResponse(res, {statusCode:200, message: "User deleted successfully" });
      }

      default:
        return res.status(200).send("Unhandled event type"); // Respond to unhandled events
    }
  } catch (error) {
    console.error("Webhook verification or processing error:", error);
    next(error);
  }
};

const userCredits = async (req, res, next) => {
  try {
    const { clerkId } = req.body;
    const userData = await userModel.findOne({ clerkId });
    console.log(userData);

    return successResponse(res, {
      statusCode: 200,
      message: "user credits retuns successfylly",
      payload: userData.creditBalance,
    });
  } catch (error) {
    return next(error);
  }
};
export { clerkWebhooks, userCredits };
