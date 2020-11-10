const express = require("express");
var bookController = require("../controllers/bookController");
var router = express.Router();

router.post("/", bookController.createBookController);

module.exports = router;
