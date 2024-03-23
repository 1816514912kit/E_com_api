export default class UserModel {
  constructor(name, email, password, type, id) {
    (this.name = name),
      (this.email = email),
      (this.password = password),
      (this.type = type);
    this._id = id;
  }

  static getAll() {
    return users;
  }
}

let users = [
  {
    id: 1,
    name: "seller user",
    email: "seller@gmail.com",
    password: "password1",
    type: "seller",
  },
  {
    id: 2,
    name: "customer user",
    email: "customer@gmail.com",
    password: "password1",
    type: "customer",
  },
];
