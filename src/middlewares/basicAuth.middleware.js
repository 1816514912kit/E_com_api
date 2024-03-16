import UserModel from "../features/User/user.model.js";

const basicAuthorizer = (req, res, next) => {
  //1. check if authorization header is empty
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (!authHeader) {
    res.status(400).send("No authorization details found");
  }
  console.log(authHeader);
  //2. Extract the  credentials [Basic jhhkjlk46lkjlkj]
  const base64Credentials = authHeader.replace("Basic", "");
  console.log(base64Credentials);
  //3. Decoding the credentials
  const decodedCreds = Buffer.from(base64Credentials, "base64").toString(
    "utf8"
  );
  console.log(decodedCreds); //[username,password]
  const creds = decodedCreds.split(":");

  const user = UserModel.getAll().find(
    (u) => u.email == creds[0] && u.password == creds[1]
  );
  if (user) {
    next();
  } else {
    res.status(401).send("Invalid Credentials");
  }
};

export default basicAuthorizer;

// Use Basic authorization inside Postman when try to use basicAuth middleware
