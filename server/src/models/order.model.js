// server/src/models/order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        emoji: String,
        price: Number,
        quantity: Number,
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      address: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    shippingPrice: { type: Number, default: 49 },
    status: {
      type: String,
      enum: ["beklemede", "hazırlanıyor", "kargoda", "teslim edildi", "iptal"],
      default: "beklemede",
    },
    paymentToken: { type: String, default: null },
    conversationId: { type: String, default: null },
    paymentId: { type: String, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
