import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";
import jsonwebtoken from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (err) {
      res.status(201).send("some thing went wrong in signup");
    }
  }
  async signIn(req, res, next) {
    try {
      //1. Find User By Email
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        // we match the password with hashed password
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          //1. create token
          const token = jsonwebtoken.sign(
            { userID: result.id, email: result.email },
            "F942DDF91A4AC1D5FC1222481C459",
            { expiresIn: "1h" }
          );
          console.log(token);
          //2.send token
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect Credentials");
        }
      }
    } catch (err) {
      return res.status(400).send("something went wrong from signin");
    }
  }
}
