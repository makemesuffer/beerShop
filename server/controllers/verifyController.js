const md5 = require("md5");

const config = require("../config");
const db = require("../loaders/db");
const wrapAsync = require("../helpers/asyncErrorHandler");

const clientOptions = config.client_Options;

exports.verifyUser = wrapAsync(async (req, res) => {
  const userData = {
    id: req.params.id
  };

  const userUpdate = await db.Users.update({
    _id: userData.id,
    action: { available: true }
  });
  if (userUpdate) {
    res.redirect(`${clientOptions.url}register`);
  } else {
    res.json({ success: false });
  }
});

exports.changePassword = wrapAsync(async (req, res) => {
  const { id, oldPassword, newPassword, repeatPassword } = req.body;

  if (!oldPassword || !newPassword || !repeatPassword) {
    return res.json({
      success: false,
      error: "Please, fill all the inputs"
    });
  }

  const user = await db.Users.getOneByID(id);
  if (md5(oldPassword) !== user.password) {
    return res.json({
      success: false,
      error: "Old Password doesn't match"
    });
  }

  if (newPassword.length < 8) {
    return res.json({
      success: false,
      error: "Password must be at least 8 characters"
    });
  }

  if (newPassword !== repeatPassword) {
    return res.json({
      success: false,
      error: "Passwords doesn't match with each others"
    });
  }

  const userUpdate = await db.Users.update({
    _id: id,
    action: { password: md5(newPassword) }
  });

  if (userUpdate) {
    return res.json({
      success: true,
      message: "password was changed"
    });
  }
  return res.json({
    success: false,
    error: "Unknown error met"
  });
});
