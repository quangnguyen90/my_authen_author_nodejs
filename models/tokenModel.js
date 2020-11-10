let mongoose = require("mongoose");
var Schema = mongoose.Schema;
var tokenSchema = new Schema(
  {
    idUser: String,
    value: String,
  },
  {
    collection: "token",
    timestamps: true,
  }
);

const TokenModel = mongoose.model("token", tokenSchema);

module.exports = TokenModel;
