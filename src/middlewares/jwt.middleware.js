// import jsonwebtoken from "jsonwebtoken";
// const JwtAuth = (req, res, next) => {
//   //1. read token
//   const token = req.headers["authorization"];
//   //2. if no token return error
//   if (!token) {
//     return res.status(401).send("unauthorized access01");
//   }
//   //3. check if token is valid'
//   try {
//     const payload = jsonwebtoken.verify(token, "F942DDF91A4AC1D5FC1222481C459");
//     console.log(payload);

//     req.userID = payload.userID;
//     next();

//     //4. return error
//   } catch (err) {
//     console.log(err);
//     res.status(401).send("unauthorized access02");
//   }
//   //4. call next middleware
// };
// export default JwtAuth;

// // if you are using jwtAuth(if acessing products)
// // 1. inside postman Authorization -> Noauth
// // 2. copy token when signin and make key inside headers key= Authorization value = token

import jwt from "jsonwebtoken";

const JwtAuth = (req, res, next) => {
  // Read token from the Authorization header
  const token = req.headers["authorization"];

  // If no token is present, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).send("Unauthorized access: Token missing");
  }

  try {
    // Verify the token using the secret key
    const payload = jwt.verify(token, "F942DDF91A4AC1D5FC1222481C459");
    console.log(payload);

    // Attach the userID from the payload to the request object
    req.userID = payload.userID;

    // Call the next middleware
    next();
  } catch (err) {
    // Handle token verification errors
    console.error("JWT verification error:", err.message);
    res.status(401).send("Unauthorized access: Invalid token");
  }
};

export default JwtAuth;
