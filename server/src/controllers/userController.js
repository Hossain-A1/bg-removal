import {Webhook} from 'svix'
import userModel from "../models/userModel.js";
import { clerk_webhook_secret } from "../secret.js";
import { successResponse } from "./responseController.js";

//end point---> api/user/webhooks
const clerkWebhooks = async (req, res, next) => {
  try {
    const whook = new Webhook(clerk_webhook_secret);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_address[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.create(userData);

        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_address[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        break;
      }
      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        break;
      }

      default:
        break;
    }
    return successResponse(res, {
      statusCode: 200,
      message: "user oparation successfull",
    });
  } catch (error) {
    next(error);
  }
};


export {clerkWebhooks}