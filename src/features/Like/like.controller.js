import LikeRepositiory from "./like.repository.js";

export default class LikeContoller {
  constructor() {
    this.likeRepository = new LikeRepositiory();
  }
  async getLike(req, res, next) {
    try {
      const { id, type } = req.query;
      const likes = await this.likeRepository.getLike(type, id);
      return res.status(200).send(likes);
    } catch (err) {
      console.log(err);
      res.status(400).send("something went wrong from add getlike");
    }
  }
  async likeItem(req, res, next) {
    try {
      const { id, type } = req.body;
      const userID = req.userID;
      if (!type == "Product" && !type == "Category") {
        res.status(400).send("Invalid type");
      }
      if (type == "Product") {
        await this.likeRepository.likeProduct(userID, id);
      } else {
        await this.likeRepository.likeCategory(userID, id);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("something went wrong from add likeItem");
    }
    res.status(201).send();
  }
}
