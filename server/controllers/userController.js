const UserServices = require("../services/userServices");
const wrapAsync = require("../helpers/asyncErrorHandler");

const userServices = new UserServices();

module.exports = class UserController {
  registerUser = wrapAsync(async function(req, res) {
    const message = await userServices.userRegister(req.body);
    return res.status(message.status).json(message);
  });

  loginUser = wrapAsync(async function(req, res) {
    const message = await userServices.userLogin(req.body);
    return res.status(message.status).json(message);
  });

  findUser = wrapAsync(async function(req, res) {
    const message = await userServices.userFind(req.params);
    return res.json(message);
  });
};
