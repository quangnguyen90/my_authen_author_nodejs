let mongoose = require("mongoose");

var Schema = mongoose.Schema;

var borrowBookSchema = new Schema(
  {
    idUser: {
      type: String,
      ref: "user",
    },
    idBook: [
      {
        type: String,
        ref: "book",
      },
    ],
  },
  {
    collection: "borrowBook",
    timestamps: true,
  }
);

const BorrowBookModel = mongoose.model("borrowBook", borrowBookSchema);

module.exports = BorrowBookModel;
