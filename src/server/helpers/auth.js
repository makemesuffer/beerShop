const jwt = require("jsonwebtoken");
const config = require("../config.js");

function verifyToken(req, res) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.json({
      success: false,
      auth: false,
      token: null
    });
  }

  return jwt.verify(token, config.jwtSECRET);
}

module.exports = verifyToken;
