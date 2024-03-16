import express from "express";
import CartItemController from "./cartItems.controller.js";

const cartRouter = express.Router();
const cartController = new CartItemController();

cartRouter.post("/", cartController.add);
cartRouter.get("/", cartController.get);
cartRouter.post("/quantity", cartController.addQuantity);
cartRouter.delete("/:id", cartController.delete);

export default cartRouter;
