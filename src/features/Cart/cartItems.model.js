import UserModel from "../User/user.model.js";
import ProductModel from "../Product/product.model.js";
export default class CartItemModel {
  constructor(userID, productId, quantity, id) {
    this.userID = userID;
    this.productId = productId;
    this.quantity = quantity;
    this.id = id;
  }
  static add(userID, productId, quantity) {
    const cartItem = new CartItemModel(userID, productId, quantity);
    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
    return cartItem;
  }
  static get(userID) {
    return cartItems.filter((i) => i.userID == userID);
  }
  static delete(cartItemId, userID) {
    const cartItemIndex = cartItems.findIndex(
      (i) => i.id == cartItemId && i.userID == userID
    );
    if (cartItemIndex == -1) {
      return "cart item not found";
    } else {
      cartItems.splice(cartItemIndex, 1);
    }
  }
  static addQuantity(userID, productId, quantity) {
    //1. validating user and product
    console.log(userID);
    const user = UserModel.getAll().find((u) => u.id == userID);
    console.log(user);
    if (!user) {
      return "user not found";
    }
    //validating product
    const product = ProductModel.getAll().find((p) => p.id == productId);
    console.log(product);
    if (!product) {
      return "product  not found";
    }
    if (!product.quan) {
      product.quan = [];
      product.quan.push({ productId: productId, quantity: quantity });
    } else {
      const existingQuan = product.quan.findIndex((r) => r.userID == userID);
      if (existingQuan >= 0) {
        product.quan[existingQuan] = {
          productId: productId,
          quantity: quantity,
        };
      } else {
        product.quan.push({ productId: productId, quantity: quantity });
      }
    }
  }
}
var cartItems = [new CartItemModel(1, 2, 1, 1), new CartItemModel(2, 1, 2, 2)];
