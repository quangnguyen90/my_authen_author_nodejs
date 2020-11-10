const express = require("express");
var borrowBookController = require("../controllers/borrowBookController");
var router = express.Router();

router.post("/", borrowBookController.createBorrowBookController);

module.exports = router;
