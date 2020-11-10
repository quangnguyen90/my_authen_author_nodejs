let mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    name: String,
  },
  {
    collection: "book",
    timestamps: true,
  }
);

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;
