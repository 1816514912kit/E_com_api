import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../User/user.model.js";
export default class ProductModel {
  constructor(name, price, desc, imageUrl, category, sizes, id) {
    (this._id = id),
      (this.name = name),
      (this.price = price),
      (this.desc = desc),
      (this.imageUrl = imageUrl),
      (this.category = category),
      (this.sizes = sizes);
  }

  // static productRating(userID, productId, rating) {
  //   //1. validating user and product
  //   const rateUser = UserModel.getAll().find((u) => u.id == userID);
  //   if (!rateUser) {
  //     throw new ApplicationError("user not found");
  //   }
  //   //validating product
  //   const product = products.find((p) => p.id == productId);
  //   if (!product) {
  //     throw new ApplicationError("product not found");
  //   }
  //   //check od there are ratings if not add ratings array
  //   if (!product.ratings) {
  //     product.ratings = [];
  //     product.ratings.push({ userID: userID, rating: rating });
  //   } else {
  //     // check if user rating is already available
  //     console.log(product.ratings);
  //     const existingRatingIndex = product.ratings.findIndex(
  //       (r) => r.userID == userID
  //     );
  //     if (existingRatingIndex >= 0) {
  //       product.ratings[existingRatingIndex] = {
  //         userID: userID,
  //         rating: rating,
  //       };
  //     } else {
  //       //if no existing rating ad new rating
  //       product.ratings.push({ userID: userID, rating: rating });
  //     }
  //   }
  // }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    19.77,
    "description for product 1",
    "https://promova.com/content/female_clothes_013b4bec9c.png",
    "category1"
  ),
  new ProductModel(
    2,
    "Product 2",
    20.23,
    "description for product 2",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToaj1e3ST5JqWDcN5lrw1vKEQoDbx_ymm9vpL1yF8NyA&s",
    "category2",
    ["XL", "M", "S"]
  ),
  new ProductModel(
    3,
    "Product 3",
    10,
    "description for product 3",
    "https://m.media-amazon.com/images/I/618CSKrK7mL._AC_UF1000,1000_QL80_.jpg",
    "category3",
    ["XL", "M", "L", "S"]
  ),
];
