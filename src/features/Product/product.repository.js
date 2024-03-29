import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";

class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async add(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      throw new ApplicationError("something went wrong in add d/b", 500);
    }
  }

  async getAll() {
    try {
      //1. get the database
      const db = getDB();
      //2. get the collections
      const collection = db.collection(this.collection);
      //3. Find the document
      const products = await collection.find().toArray();
      return products;
    } catch (err) {
      throw new ApplicationError("Something Went Wrong in getAll d/b", 500);
    }
  }

  async get(id) {
    try {
      //1. get the database
      const db = getDB();
      //2. get the collections
      const collection = db.collection(this.collection);
      //3. Find the document
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      throw new ApplicationError("Something Went Wrong  in get d/b", 500);
    }
  }
  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterExpression.category = category;
      }
      return await collection.find(filterExpression).toArray();
    } catch (err) {
      throw new ApplicationError("Something Went Wrong  in filter d/b", 500);
    }
  }
  // async productRating(userID, productId, rating) {
  //   try {
  //     const db = getDB();
  //     const collection = db.collection(this.collection);
  //     //1. Find the product
  //     const product = await collection.findOne({
  //       _id: new ObjectId(productId),
  //     });
  //     //2. find the rating
  //     const userRating = product?.ratings?.find((r) => r.userID == userID);
  //     if (userRating) {
  //       //3. Update the rating
  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(productId),
  //           "ratings.userID": new ObjectId(userID),
  //         },
  //         {
  //           $set: {
  //             "ratings.$.rating": rating,
  //           },
  //         }
  //       );
  //     } else {
  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(productId),
  //         },
  //         {
  //           $push: { ratings: { userID: new ObjectId(userID), rating } },
  //         }
  //       );
  //     }
  //   } catch (err) {
  //     throw new ApplicationError("Something Went Wrong  in rating d/b", 500);
  //   }
  // }

  async productRating(userID, productId, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      //1. Remove existing entry
      await collection.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $pull: { ratings: { userID: new ObjectId(userID) } },
        }
      );
      //2. add new Entry
      await collection.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $push: { ratings: { userID: new ObjectId(userID), rating } },
        }
      );
    } catch (err) {
      throw new ApplicationError("Something Went Wrong  in rating d/b", 500);
    }
  }
  async averageProductPricePerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          {
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
    } catch (err) {
      console.log(err);
    }
  }
}
export default ProductRepository;
