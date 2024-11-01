import "dotenv/config";
const PORT = process.env.PORT || 4001;
const mongoAtlasURL =
  process.env.MONGO_ATLAS_URI || "mongodb://localhost:27017/bg-removal";

  const clerk_webhook_secret = process.env.CLERK_WEBHOOK_SECRET

export { PORT, mongoAtlasURL ,clerk_webhook_secret};
