import ProductModel from "./product.model.js";
export class ProductController {
  getAllProducts(req, res) {
    var products = ProductModel.getAll();
    res.status(200).send(products);
  }

  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const createdRecord = ProductModel.add(newProduct);
    res.status(201).send(createdRecord);
  }

  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.get(id);
    if (!product) {
      res.status(404).send("product is not found");
    } else {
      return res.status(200).send(product);
    }
  }

  filterProduct(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;

    const result = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).send(result);
  }

  rateProduct(req, res) {
    const userID = req.query.userID;
    const productId = req.query.productId;
    const rating = req.query.rating;
    const error = ProductModel.productRating(userID, productId, rating);
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send("rating has been added");
    }
  }
}
