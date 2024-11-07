import "dotenv/config";
const PORT = process.env.PORT || 4001;
const mongoAtlasURL =
  process.env.MONGO_ATLAS_URI || "mongodb://localhost:27017/bg-removal";
const clipDrop_api =
  process.env.CLIPDROP_API ||
  "99efa86635f35ce8d9e3229d08dfb2c0cedde721f7844ba3042d2e9de2be3181b4c318972c135f62bea8af34fc040ba3";

const clerk_webhook_secret = process.env.CLERK_WEBHOOK_SECRET;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export {
  PORT,
  mongoAtlasURL,
  clerk_webhook_secret,
  clipDrop_api,
  stripeSecretKey,
};
