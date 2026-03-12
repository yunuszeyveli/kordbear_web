// server/src/models/product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      enum: ["Yeni", "Çok Satan", "İndirim", null],
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    specs: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
