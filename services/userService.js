let UserModel = require("../models/userModel");
let bcrypt = require("bcrypt");
const SALT_ROUND = 10;

let signUp = (inforUser) => {
  let { email, username, password } = inforUser;
  if (username && password) {
    const salt = bcrypt.genSaltSync(SALT_ROUND);
    const hash = bcrypt.hashSync(password, salt);
    return UserModel.create({
      email,
      username,
      password: hash,
    });
  } else {
    throw "Error: Username & Password are required";
  }
};

let login = (email, password) => {
  return UserModel.findOne({ email, password });
};

let checkEmail = (email) => {
  return UserModel.findOne({ email });
};

let getDetailUser = (id) => {
  return UserModel.findOne({ _id: id });
};

module.exports = {
  signUp,
  login,
  checkEmail,
  getDetailUser,
};
