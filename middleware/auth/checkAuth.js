const jwt = require("jsonwebtoken");
const secret=require("./secret");

module.exports = (req, res, next) => {
  try {
    req.decrypt= jwt.verify(req.headers.authorization, secret);
    next();
  } catch (err) {
    res.status(401).json({ message: err.message, request: req.headers.authorization });
  }
};
