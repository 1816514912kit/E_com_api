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
const app = express();

// app.use(bodyParser.json());
app.use(express.json());
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
app.use("/api/products", JwtAuth, productRouter);
app.use("/api/users", userRouter);
app.use("/api/cartItems", JwtAuth, loggerMiddleware, cartRouter);
app.use(loggerMiddleware);
// CORS Policy Configuration

app.get("/", (req, res) => {
  res.send("welcome to e-commerce api");
});
app.use((req, res) => {
  res
    .status(400)
    .send("You have entered wrong API. please check your documentation");
});

app.listen("3002", () => {
  console.log("server is running on 3002");
});
