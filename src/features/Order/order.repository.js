import { getClient, getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }
  async placeOrder(userID) {
    const client = getClient();
    const session = client.startSession();
    try {
      const db = getDB();
      session.startTransaction();

      // 1. Get cartitems and calculate total amount.
      const items = await this.getTotalAmt(userID, session);
      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      console.log(finalTotalAmount);
      // 2. Create an order record.
      const newOrder = new OrderModel(
        new ObjectId(userID),
        finalTotalAmount,
        new Date()
      );
      await db.collection(this.collection).insertOne(newOrder, { session });

      // 3. Reduce the stock.(products quantity)
      for (let item in items) {
        db.collection("products").updateOne(
          { _id: item.productId },
          { $inc: { stock: -item.quantity } },
          { session }
        );
      }
      // 4. Clear the cart items.
      await db
        .collection("cartItems")
        .updateMany({ userID: new ObjectId(userID) }, { session });
      session.commitTransaction();
      session.endSession();
      return;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async getTotalAmt(userID, session) {
    const db = getDB();
    const items = await db
      .collection("cartItems")
      .aggregate(
        [
          {
            //1. get cart items for user
            $match: { userID: new ObjectId(userID) },
          },
          {
            // 2. Get the products form products collection.
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          // 3. Unwind the productinfo.
          {
            $unwind: "$productInfo",
          },
          // 4. Calculate totalAmount for each cartitems.
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$productInfo.price", "$quantity"],
              },
            },
          },
        ],
        { session }
      )
      .toArray();
    return items;
  }
}
