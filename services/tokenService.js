let TokenModel = require("../models/tokenModel");

function getDetail(idUser) {
  return TokenModel.findOne({
    idUser: idUser,
  });
}

function addToken(idUser, refreshToken) {
  return TokenModel.create({
    idUser: idUser,
    value: refreshToken,
  });
}

function updateToken(idUser, refreshToken) {
  return TokenModel.updateOne(
    {
      idUser: idUser,
    },
    {
      value: refreshToken,
    }
  );
}

module.exports = {
  getDetail,
  addToken,
  updateToken,
};
