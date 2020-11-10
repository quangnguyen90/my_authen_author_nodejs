const express = require("express");
var userController = require("../controllers/userController");
var router = express.Router();
var authMiddlewares = require("../middlewares/auth");

router.post(
  "/login",
  authMiddlewares.checkExistedEmail,
  userController.loginController
);
router.post(
  "/sign-up",
  authMiddlewares.checkUser,
  userController.signUpController
);

module.exports = router;
