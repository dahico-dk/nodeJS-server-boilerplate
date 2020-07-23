const jwt = require("jsonwebtoken");
const secret=require("./secret");
module.exports=(payload) => {
  return jwt.sign(payload, secret);
};