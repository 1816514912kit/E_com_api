import CartItemModel from "./cartItems.model.js";
import CartItemRepository from "./cartItems.repository.js";

export default class CartItemController {
  constructor() {
    this.cartItemRepository = new CartItemRepository();
  }
  async add(req, res) {
    try {
      const { productId, quantity } = req.body;
      const userID = req.userID;
      console.log(req.userID);

      const cart = await this.cartItemRepository.add(
        userID,
        productId,
        quantity
      );
      res.status(201).send("Cart is updated");

      if (!cart) {
        res.status(400).send("item not found");
      } else {
        res.status(200).send("cart item has been updated");
      }
    } catch (err) {
      return res.status(400).send("something went wrong from addProduct");
    }
  }
  async get(req, res) {
    try {
      const userID = req.userID; // userID you can check inside jwtmiddleware in 3/.
      const items = this.cartItemRepository.get(userID);
      res.status(200).send(items);
    } catch (err) {
      return res.status(400).send("something went wrong from addProduct");
    }
  }

  async delete(req, res) {
    const userID = req.userID;
    const cartItemId = req.params.id;
    const isDeleted = await this.cartItemRepository.delete(userID, cartItemId);
    if (!isDeleted) {
      res.status(400).send("cartItem  not found");
    }
    return res.status(200).send("cart item deleted");
  }
  addQuantity(req, res) {
    console.log(req.query);
    const userID = req.query.userID;

    const productId = req.query.productId;
    // const quantity = req.query.quantity;
    const quantity = parseInt(req.query.quantity);
    const error = CartItemModel.addQuantity(userID, productId, quantity);
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send("quantity has been added");
    }
  }
}
