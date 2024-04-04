import mongoose from "mongoose";
import { UserSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const UserModel = mongoose.model("User", UserSchema);

export default class UserRepository {
  constructor() {}

  async resetPassword(userID, newPassword) {
    try {
      let user = await UserModel.findById(userID);
      if (user) {
        user.password = newPassword;
        user.save();
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Something Went Wrong  from database resetPass",
        500
      );
    }
  }
  async signUp(user) {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        console.log(err);
        throw new ApplicationError(
          "Something went wrong with signup database",
          500
        );
      }
    }
  }
  async signIn(email, password) {
    try {
      return await UserModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong signin D/B", 500);
    }
  }
  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Something Went Wrong  from database findByEmail",
        500
      );
    }
  }
}
