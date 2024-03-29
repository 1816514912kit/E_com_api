import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProducts(req, res) {
    try {
      var products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      return res.status(400).send("something went wrong from addProduct");
    }
  }

  async addProduct(req, res) {
    try {
      const { name, price, sizes } = req.body;
      const newProduct = new ProductModel(
        name,
        parseFloat(price),
        null,
        req.file.filename,
        null,
        sizes.split(",")
      );

      const createdRecord = await this.productRepository.add(newProduct);
      return res.status(201).send(createdRecord);
    } catch (err) {
      return res.status(400).send("something went wrong from getallProduct");
    }
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      var product = await this.productRepository.get(id);
      if (!product) {
        return res.status(404).send("product is not found");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      return res.status(400).send("something went wrong from getOneProduct");
    }
  }

  async filterProduct(req, res) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;

      const result = await this.productRepository.filter(
        minPrice,
        maxPrice,
        category
      );
      res.status(200).send(result);
    } catch (err) {
      return res.status(400).send("something went wrong from filterProduct");
    }
  }

  async rateProduct(req, res, next) {
    //take userID productId and rating as body in postman
    try {
      const userID = req.userID;
      const productId = req.body.productId;
      console.log(productId);
      const rating = req.body.rating;
      console.log(rating);
      await this.productRepository.productRating(userID, productId, rating);
      return res.status(200).send("rating has been added");
    } catch (err) {
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }
  async averageProductPricePerCategory(req, res) {
    try {
      const result =
        await this.productRepository.averageProductPricePerCategory();
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
}
