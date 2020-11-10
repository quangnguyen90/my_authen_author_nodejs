const express = require("express");
var borrowBookController = require("../controllers/borrowBookController");
var router = express.Router();
var authMiddlewares = require("../middlewares/auth");

router.use(authMiddlewares.checkAuth);
router.use(authMiddlewares.checkAdmin);

router.post("/", borrowBookController.createBorrowBookController);

module.exports = router;
