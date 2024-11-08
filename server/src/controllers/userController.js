import { Webhook } from "svix";
import Stripe from "stripe";
import userModel from "../models/userModel.js";
import { clerk_webhook_secret, stripeSecretKey } from "../secret.js";
import { successResponse } from "./responseController.js";
import paymentModel from "../models/paymentModel.js";

const stripe = new Stripe(stripeSecretKey);

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
          photo: data.image_url || data.profile_image_url,
        };

        await userModel.create(userData);
        return successResponse(res, {
          statusCode: 201,
          message: "User created successfully",
        });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url || data.profile_image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        return successResponse(res, {
          statusCode: 200,
          message: "User updated successfully",
        });
      }

      case "user.deleted": {
        await paymentModel.findOneAndDelete({clerkId})
        await userModel.findOneAndDelete({ clerkId: data.id });
        return successResponse(res, {
          statusCode: 200,
          message: "User deleted successfullyy",
        });
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

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const credits = userData.creditBalance;

    return successResponse(res, {
      statusCode: 200,
      message: "user credits retuns successfylly",
      payload: credits,
    });
  } catch (error) {
    return next(error);
  }
};

const paymentStripe = async (req, res, next) => {
  try {
    const { clerkId, planId } = req.body;
    const { origin } = req.headers;

    const userData = await userModel.findOne({ clerkId });

    if (!userData || !planId) {
      throw new Error("Invalid credentials");
    }

    let credits, plan, amount, date;

    // Determine plan details based on planId
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 30;
        break;
      case "Business":
        plan = "Business";
        credits = 500;
        amount = 150;
        break;
      default:
        throw new Error("Invalid planId provided");
    }

    date = Date.now();

    // Creating transaction data
    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await paymentModel.create(transactionData);

    const updatedCreditBalance =
      (userData.creditBalance || 0) + newTransaction.credits;

    await userModel.findByIdAndUpdate(userData._id, {
      creditBalance: updatedCreditBalance,
    });

    // Set up line item details for Stripe
    const line_items = [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: planId,
          },
          unit_amount: amount * 100,
        },
        quantity: credits,
      },
    ];

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}`,
      cancel_url: `${origin}/cancel`,
    });

    res.json({ success: true, session_url: session.url });
    return;
  } catch (error) {
    return next(error);
  }
};

export { clerkWebhooks, userCredits, paymentStripe };
