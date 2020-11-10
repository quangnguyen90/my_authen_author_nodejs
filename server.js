require("dotenv").config();
const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var userRouter = require("./routers/user");
var bookRouter = require("./routers/book");
var borrowBookRouter = require("./routers/borrowBook");
var connectDB = require("./config/dbConnect");
var app = express();

connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "/public")));

app.use("/api/users", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/borrowBook", borrowBookRouter);

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/sign-up", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/views/signup.html"));
});

app.get("/login", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.listen(3000);
