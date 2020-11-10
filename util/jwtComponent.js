var jwt = require("jsonwebtoken");

const generateJWT = (values, secret, expiresIn) => {
  return new Promise((resolve, reject) => {
    try {
      let token = jwt.sign(values, secret, {
        algorithm: "HS512",
        expiresIn: expiresIn,
      });
      resolve(token);
    } catch (error) {
      reject(error.message);
    }
  });
};

const verifyJWT = (value, secret) => {
  return new Promise((resolve, reject) => {
    try {
      let decodeToken = jwt.sign(value, secret);
      resolve(decodeToken);
    } catch (error) {
      if (error.message === "jwt must be provided") {
        reject("Please provide token");
      }

      if (error.message === "jwt expired") {
        reject("Token is expired");
      }

      if (error.message === "invalid signature") {
        reject("Please send token again");
      }

      reject("Internal Server Error");
    }
  });
};

module.exports = {
  generateJWT,
  verifyJWT,
};
