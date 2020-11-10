let userService = require("../services/userService");
let tokenService = require("../services/tokenService");
let bcrypt = require("bcrypt");
//let jwt = require("jsonwebtoken");
let jwtUtils = require("../util/jwtComponent");

let signUpController = async (req, res) => {
  try {
    await userService.signUp(req.body);
    return res.status(200).json({
      error: false,
      status: 200,
      message: "Signup OK",
    });
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: true,
        status: 400,
        message: "Signup fail",
      });
    }
  }
};

let loginController = (req, res) => {
  let { password } = req.body;
  let user = req.user;
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return res.status(500).json({
        error: true,
        status: 500,
        message: "Internal Server Error",
      });
    }
    if (result) {
      // var accessToken = jwt.sign(
      //   { _id: user._id },
      //   process.env.JWT_SECRET,
      //   {
      //     algorithm: "HS512",
      //     expiresIn: "1d",
      //   }
      // );
      // var refreshToken = jwt.sign(
      //   { _id: user._id },
      //   process.env.JWT_SECRET,
      //   {
      //     algorithm: "HS512",
      //     expiresIn: "3650d",
      //   }
      // );

      var accessToken = "";
      jwtUtils
        .generateJWT({ _id: user._id }, process.env.JWT_SECRET, "1d")
        .then((token) => {
          return (accessToken = token);
        });

      var refreshToken = "";
      jwtUtils
        .generateJWT({ _id: user._id }, process.env.JWT_SECRET, "3650d")
        .then((token) => {
          return (refreshToken = token);
        });
      user["password"] = undefined;
      tokenService.getDetail(user._id).then(function (checkToken) {
        if (!checkToken) {
          tokenService.addToken(user._id, refreshToken).then(function () {
            return res.json({
              error: false,
              status: 200,
              message: "Login OK",
              accessToken: accessToken,
              refreshToken: refreshToken,
              data: {
                user: req.user,
              },
            });
          });
        } else {
          tokenService.updateToken(user._id, refreshToken).then(function () {
            return res.json({
              error: false,
              status: 200,
              message: "Login OK",
              accessToken: accessToken,
              refreshToken: refreshToken,
              data: {
                user: req.user,
              },
            });
          });
        }
      });
    } else {
      return res.status(400).json({
        error: true,
        status: 400,
        message: "Wrong account",
      });
    }
  });
};

module.exports = {
  signUpController,
  loginController,
};
