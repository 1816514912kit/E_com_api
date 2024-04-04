import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../features/Product/category.schema.js";

export const connectMongooseToMongoDB = async () => {
  try {
    mongoose.connect(process.env.DB_URL).then(() => {
      console.log("mongoDB To Mongoose is connected");
      addCategories();
    });
  } catch (err) {
    console.log(err);
  }
  async function addCategories() {
    const CategoryModel = mongoose.model("Category", categorySchema);
    const categories = await CategoryModel.find();
    if (!categories || categories.length == 0) {
      await categoryModel.insertMany([
        { name: "Books" },
        { name: "Clothing" },
        { name: "Electronics" },
      ]);
    }
  }
  console.log("categories added");
};
