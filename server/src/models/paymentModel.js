import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
  },
});

paymentSchema.index({ clerkId: 1 }, { unique: false });

const paymentModel = model("payment", paymentSchema);
export default paymentModel;
