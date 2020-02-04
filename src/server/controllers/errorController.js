const moment = require("moment");
const validator = require("email-validator");

const handleErrorBoundary = (error, req, res) => {
  const { login, password, birthDate } = req.body;

  if (!login || !password) {
    res.json({
      success: false,
      error: "Empty login or password"
    });
  }

  if (password.length < 8) {
    res.json({
      success: false,
      error: "Password must be at least 8 characters"
    });
  }

  if (moment().diff(birthDate, "years") < 18) {
    res.json({
      success: false,
      error: "maloy kakoe pivo tebe? S'ebal otsuda"
    });
  }

  if (!validator.validate(login)) {
    res.json({
      success: false,
      error: "login incorrect, need email format"
    });
  }

  return res.status(400).json({
    success: false,
    message: error.message
  });
};

module.exports = handleErrorBoundary;
