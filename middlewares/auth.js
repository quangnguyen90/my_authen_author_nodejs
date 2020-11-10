var userService = require("../services/userService");
var jwt = require("jsonwebtoken");
let checkUser = async (req, res, next) => {
  try {
    var user = await userService.checkEmail(req.body.email);
    if (!user) {
      next();
    } else {
      return res.status(400).json({
        error: false,
        status: 400,
        message: "Account is existed",
      });
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({
        error: false,
        status: 500,
        message: "Internal server error",
      });
    }
  }
};

let checkExistedEmail = async (req, res, next) => {
  try {
    var user = await userService.checkEmail(req.body.email);
    if (!user) {
      return res.status(400).json({
        error: false,
        status: 400,
        message: "Email is not existed",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({
        error: false,
        status: 500,
        message: "Internal server error",
      });
    }
  }
};

let checkAuth = async (req, res, next) => {
  var token =
    req.cookies.token ||
    req.body.token ||
    req.headers.authorization.trim().split("Bearer ")[1];
  var decodeUser = jwt.verify(token, process.env.JWT_SECRET);
  var user = await userService.getDetailUser(decodeUser._id);
  try {
    if (user) {
      req.userLocal = user;
      next();
    } else {
      return res.json({
        error: false,
        status: 400,
        message: "Please login",
      });
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({
        error: false,
        status: 500,
        message: "Internal server error",
      });
    }
  }
};

let checkAdmin = (req, res, next) => {
  try {
    if (req.userLocal.role === "admin") {
      next();
    } else {
      return res.json({
        error: false,
        status: 400,
        message: "You do not have permission",
      });
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({
        error: false,
        status: 500,
        message: "Internal server error",
      });
    }
  }
};

module.exports = {
  checkUser,
  checkExistedEmail,
  checkAuth,
  checkAdmin,
};
