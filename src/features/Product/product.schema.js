import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  desc: String,
  category: String,
  inStock: Number,
});
