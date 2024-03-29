import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";

export default class CartItemRepository {
  constructor() {
    this.collection = "cartItems";
  }
  async add(userID, productId, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const id = await this.getNextCounter(db);

      // find the document. update/create
      await collection.updateOne(
        {
          userID: new ObjectId(userID),
          productId: new ObjectId(productId),
        },
        {
          $setOnInsert: { _id: id },
          $inc: { quantity: quantity },
        },
        { upsert: true }
      );
      console.log(userID);
    } catch (err) {
      throw new ApplicationError("something went wrong in d/b", 500);
    }
  }
  async get(userID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userID: new ObjectId(userID) }).toArray();
    } catch (err) {
      throw new ApplicationError("something went wrong in d/b", 500);
    }
  }
  async delete(userID, cartItemId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        userID: new ObjectId(userID),
        _id: new ObjectId(cartItemId),
      });

      return result.deletedCount > 0;
    } catch (err) {
      throw new ApplicationError("something went wrong in d/b", 500);
    }
  }
  async getNextCounter(db) {
    const resultDocument = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "cartItemId" },
        { $inc: { value: 1 } },
        { returnDocument: "after" }
      );
    console.log(resultDocument);
    return resultDocument.value.value;
  }
}
