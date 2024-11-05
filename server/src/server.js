import app from "./app.js";
import connectDB from "./config/db.js";
import { PORT } from "./secret.js";

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
};

startServer();
