import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
class UserRepository {
  async signUp(newUser) {
    try {
      //1. get the database
      const db = getDB();
      //2. get the collections
      const collection = db.collection("users");
      //3. Insert the document
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      throw new ApplicationError("Something Went Wrong  from database", 500);
    }
  }
  async signIn(email, password) {
    try {
      //1. get the database
      const db = getDB();
      //2. get the collections
      const collection = db.collection("users");
      //3. Find the document
      return await collection.findOne({ email, password });
    } catch (err) {
      throw new ApplicationError("Something Went Wrong  from database", 500);
    }
  }
  async findByEmail(email) {
    try {
      //1. get the database
      const db = getDB();
      //2. get the collections
      const collection = db.collection("users");
      //3. Find the document
      return await collection.findOne({ email });
    } catch (err) {
      throw new ApplicationError("Something Went Wrong  from database", 500);
    }
  }
}
export default UserRepository;
