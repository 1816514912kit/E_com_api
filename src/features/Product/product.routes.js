import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";

const router = express.Router();
const productController = new ProductController();

router.get("/filter", (req, res) => {
  productController.filterProduct(req, res);
});
// http://localhost:3002/api/products/filter?minPrice=20&maxPrice=20&category=category1
router.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
router.post("/", upload.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});
router.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});
router.post("/rating", (req, res) => {
  productController.rateProduct(req, res);
});

export default router;
