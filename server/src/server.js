import app from "./app.js";
import connectDB from "./config/db.js";
import { PORT } from "./secret.js";

app.listen(PORT, async () => {
  console.log(`App running on port ${PORT}`);
  await connectDB();
});
