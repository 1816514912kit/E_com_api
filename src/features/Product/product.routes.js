import express from "express";
import { ProductController } from "./product.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";

const router = express.Router();
const productController = new ProductController();

router.get("/filter", productController.filterProduct);
// http://localhost:3002/api/products/filter?minPrice=20&maxPrice=20&category=category1
router.get("/", productController.getAllProducts);
router.post("/", upload.single("imageUrl"), productController.addProduct);
router.get("/:id", productController.getOneProduct);
router.post("/rating", productController.rateProduct);

export default router;
