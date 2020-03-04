const wrapAsync = require("../helpers/asyncErrorHandler");
const VerifyServices = require("../services/verifyServices");
const config = require("../config");

const clientOptions = config.client_Options;
const verifyServices = new VerifyServices();

module.exports = class VerifyController {
  verifyUser = wrapAsync(async function(req, res) {
    const decision = await verifyServices.userVerify(req.params);
    if (decision) return res.redirect(`${clientOptions.url}/register`);
    return res.json({ success: false });
  });

  changePassword = wrapAsync(async function(req, res) {
    const message = await verifyServices.passwordChange(req.body);
    return res.json(message);
  });

  forgotPassword = wrapAsync(async function(req, res) {
    const message = await verifyServices.passwordForgot(req.body);
    return res.json(message);
  });

  checkCode = wrapAsync(async function(req, res) {
    const message = await verifyServices.codeCheck(req.params);
    return res.json(message);
  });

  replacePassword = wrapAsync(async function(req, res) {
    const message = await verifyServices.passwordReplace(req.body);
    return res.json(message);
  });
};
