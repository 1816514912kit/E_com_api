import CartItemModel from "./cartItems.model.js";

export default class CartItemController {
  add(req, res) {
    const { productId, quantity } = req.query;
    const userID = req.userID;
    const cart = CartItemModel.add(userID, productId, quantity);
    if (!cart) {
      res.status(400).send("item not found");
    } else {
      res.status(200).send("cart item has been updated");
    }
  }
  get(req, res) {
    const userID = req.userID; // userID you can check inside jwtmiddleware in 3/.
    const items = CartItemModel.get(userID);
    res.status(200).send(items);
  }

  delete(req, res) {
    const userID = req.userID;
    const cartItemId = req.params.id;
    const error = CartItemModel.delete(cartItemId, userID);
    if (error) {
      res.status(400).send(error);
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
