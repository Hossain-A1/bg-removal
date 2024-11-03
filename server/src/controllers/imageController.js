import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";
import { clipDrop_api } from "../secret.js";
import { successResponse } from "./responseController.js";

const removeBgImage = async (req, res, next) => {
  try {
    const { clerkId } = req.body;

    const user = await userModel.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found with whis clerkId");
    }

    if (user.creditBalance === 0) {
      throw new Error(
        "Your credit is not enough for remove bg. Buy some credits"
      );
    }

    const imagePath = req.file.path;
    const imageFile = fs.createReadStream(imagePath);
    const formData = new FormData();
    formData.append("image_file", imageFile);

    const { data } = await axios.post(
      "https://clipdrop-api.co/cleanup/v1",
      formData,
      { headers: { "x-api-key": clipDrop_api }, responseType: "arraybuffer" }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");

    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });
    return successResponse(res, {
      statusCode: 200,
      message: "bg was removed successfully",
      payload: {
        resultImage,
        creditBalance: user.creditBalance - 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { removeBgImage };
