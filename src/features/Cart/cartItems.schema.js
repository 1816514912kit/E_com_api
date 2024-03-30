import mongoose, { Schema } from "mongoose";

export const CartSchema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
});
