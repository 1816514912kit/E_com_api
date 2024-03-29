import OrderController from "./order.controller.js";
import express from "express";

const orderRouter = express.Router();

const orderController = new OrderController();

orderRouter.post("/", (req, res, next) => {
  orderController.placeOrder(req, res, next);
});

export default orderRouter;
