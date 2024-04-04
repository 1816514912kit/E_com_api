import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { likeSchema } from "./like.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const likeModel = mongoose.model("Like", likeSchema);
export default class LikeRepositiory {
  async getLike(type, id) {
    try {
      return await likeModel
        .find({
          likeable: new ObjectId(id),
          types: type,
        })
        .populate("user")
        .populate({ path: "likeable", model: type });
    } catch (err) {
      throw new ApplicationError("something went wrong in add d/b", 500);
    }
  }

  async likeProduct(userID, productId) {
    try {
      const newLike = new likeModel({
        user: new ObjectId(userID),
        likeable: new ObjectId(productId),
        types: "Product",
      });
      await newLike.save();
    } catch (err) {
      throw new ApplicationError(
        "something went wrong in likeProduct d/b",
        500
      );
    }
  }
  async likeCategory(userID, categoryId) {
    try {
      const newLike = new likeModel({
        user: new ObjectId(userID),
        likeable: new ObjectId(categoryId),
        types: "Category",
      });
      await newLike.save();
    } catch (err) {
      throw new ApplicationError(
        "something went wrong in likeCategory d/b",
        500
      );
    }
  }
}
