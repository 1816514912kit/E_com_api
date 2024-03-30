import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectMongooseToMongoDB = async () => {
  try {
    mongoose.connect(process.env.DB_URL).then(() => {
      console.log("mongoDB To Mongoose is connected");
    });
  } catch (err) {
    console.log(err);
  }
};
