import mongoose from "mongoose";
import { mongoAtlasURL } from "../secret.js";

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongoAtlasURL, {
      ...options,
      connectTimeoutMS: 20000, // 20 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });

    console.log("Connected to DB successfully");

    // Listening for mongoose connection events
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (error) => {
      console.error(`Connection error: ${error}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from DB");
    });
  } catch (error) {
    console.error(`Failed to connect to DB: ${error.toString()}`);
  }
};

export default connectDB;
