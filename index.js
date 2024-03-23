import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";

import productRouter from "./src/features/Product/product.routes.js";
import userRouter from "./src/features/User/user.routes.js";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import JwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/Cart/cartItems.routes.js";
// import bodyParser from "body-parser";
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import { connectToMongoDB } from "./src/config/mongodb.js";
const app = express();

// app.use(bodyParser.json());
app.use(express.json());
// app.use(loggerMiddleware);

app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
app.use("/api/products", JwtAuth, productRouter);
app.use("/api/users", userRouter);
app.use("/api/cartItems", loggerMiddleware, cartRouter);
// CORS Policy Configuration

app.get("/", (req, res) => {
  res.send("welcome to e-commerce api");
});
// Error handler Middleware
app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  }
  //server errors
  res.status(500).send("Something Went Wrong");
});
app.use((req, res) => {
  res
    .status(400)
    .send("You have entered wrong API. please check your documentation");
});

app.listen("3002", () => {
  console.log("server is running on 3002");
  connectToMongoDB();
});
