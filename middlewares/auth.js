var userService = require("../services/userService");
var jwt = require('jsonwebtoken');
async function checkUser(req, res, next) {
  var user = await userService.checkEmail(req.body.email);
  if (!user) {
    next();
  } else {
    return res.json({
      error: false,
      status: 400,
      message: "Account is existed",
    });
  }
}

async function checkAuth(req, res, next) {
  var token = req.cookies.token || req.headers.authorization.trim().split("Bearer ")[1];
  var decodeUser = jwt.verify(token, process.env.JWT_SECRET);
  var user = await userService.getDetailUser(decodeUser._id);
  if (!user) {
    req.user = user;
    next();
  } else {
    return res.json({
      error: false,
      status: 400,
      message: "Please login",
    });
  }
}

function checkAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    next();
  } else {
    return res.json({
      error: false,
      status: 400,
      message: "You do not have permission",
    });
  }
}

module.exports = {
  checkUser,
  checkAuth,
  checkAdmin
};
