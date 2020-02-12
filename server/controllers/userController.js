const userServices = require("../services/userServices");
const wrapAsync = require("../helpers/asyncErrorHandler");

exports.registerUser = wrapAsync(async (req, res) => {
  const message = await userServices.userRegister(req.body);
  return res.json(message);
  // return res.status(message.status).json(message);
});

exports.loginUser = wrapAsync(async (req, res) => {
  const message = await userServices.userLogin(req.body);
  return res.json(message);
});

exports.findUser = wrapAsync(async (req, res) => {
  const message = await userServices.userFind(req.params);
  return res.json(message);
});
