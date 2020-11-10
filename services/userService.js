let UserModel = require("../models/userModel");
function signUp(email, username, password) {
  return UserModel.create({
    email,
    username,
    password,
  });
}

function login(email, password) {
  return UserModel.findOne({ email, password });
}

function checkEmail(email) {
  return UserModel.findOne({ email });
}

module.exports = {
  signUp,
  login,
  checkEmail,
};
