import mongoose from "mongoose";
import { mongoAtlasURL } from "../secret.js";


const connectDB = async (options = {}) => {
  try {
    mongoose.connect(mongoAtlasURL, options);
    console.log("Connectinos DB successfully");
    mongoose.connection.on("Error", (error) => {
      console.log(`Connection DB error :${error}`);
    });
  } catch (error) {
    console.log(`Connecting DB failed ${error.toString()}`);
  }
};

export default connectDB;
