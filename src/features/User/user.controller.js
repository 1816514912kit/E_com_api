import UserModel from "./user.model.js";
import jsonwebtoken from "jsonwebtoken";
export default class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;

    const user = UserModel.signUp(name, email, password, type);
    res.status(201).send(user);
  }
  signIn(req, res) {
    const result = UserModel.signIn(req.body.email, req.body.password);
    // console.log(result);

    if (!result) {
      return res.status(400).send("Incorrect Credentials");
    } else {
      //1. create token
      const token = jsonwebtoken.sign(
        { userID: result.id, email: result.email },
        "F942DDF91A4AC1D5FC1222481C459",
        { expiresIn: "1h" }
      );
      console.log(token);
      //2.send token
      return res.status(200).send(token);
    }
  }
}
