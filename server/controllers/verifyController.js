const wrapAsync = require("../helpers/asyncErrorHandler");
const verifyServices = require("../services/verifyServices");
const config = require("../config");

const clientOptions = config.client_Options;

exports.verifyUser = wrapAsync(async (req, res) => {
  const decision = await verifyServices.userVerify(req.params);
  if (decision) return res.redirect(`${clientOptions.url}/register`);
  return res.json({ success: false });
});

exports.changePassword = wrapAsync(async (req, res) => {
  const message = await verifyServices.passwordChange(req.body);
  return res.json(message);
});

exports.forgotPassword = wrapAsync(async (req, res) => {
  const message = await verifyServices.passwordForgot(req.body);
  return res.json(message);
});

exports.checkCode = wrapAsync(async (req, res) => {
  const message = await verifyServices.codeCheck(req.body);
  return res.json(message);
});

exports.replacePassword = wrapAsync(async (req, res) => {
  const message = await verifyServices.passwordReplace(req.body);
  return res.json(message);
});
