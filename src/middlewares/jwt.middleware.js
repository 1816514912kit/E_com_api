import jsonwebtoken from "jsonwebtoken";
const JwtAuth = (req, res, next) => {
  //1. read token
  const token = req.headers["authorization"];
  //2. if no token return error
  if (!token) {
    return res.status(401).send("unauthorized access");
  }
  //3. check if token is valid'
  try {
    const payload = jsonwebtoken.verify(token, "F942DDF91A4AC1D5FC1222481C459");
    console.log(payload);

    req.userID = payload.userID;

    //4. return error
  } catch (err) {
    res.status(401).send("unauthorized access");
  }
  //4. call next middleware
  next();
};
export default JwtAuth;

// if you are using jwtAuth(if acessing products)
// 1. inside postman Authorization -> Noauth
// 2. copy token when signin and make key inside headers key= Authorization value = token
