const md5 = require("md5");

const mailer = require("./../helpers/mailer");
const wrapAsync = require("../helpers/asyncErrorHandler");
const db = require("../loaders/db");

exports.registerUser = wrapAsync(async (req, res) => {
  const { login, password, firstName, lastName, birthDate } = req.body;

  const userData = {
    login,
    password: md5(password),
    birthDate,
    firstName,
    lastName
  };
  const result = await db.Users.create(userData);
  console.log(result);
  if (result.login) {
    const link = `http://${req.get("host")}/account/verify/${result._id}`;
    await mailer.send({
      source: "email-verification",
      login: userData.login,
      link
    });
    res.json({
      success: true,
      user: {
        login: result.login,
        available: result.available
      }
    });
  }
});
