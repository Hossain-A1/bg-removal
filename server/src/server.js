import app from "./app.js";
import connectDB from "./config/db.js";
import { PORT } from "./secret.js";

if(process.env.NODE_ENV !== "production"){
  app.listen(PORT, async () => {
    console.log(`App running on port ${PORT}`);
    await connectDB()
  });
}

