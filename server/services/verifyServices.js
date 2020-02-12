const md5 = require("md5");

const db = require("../loaders/db");

exports.userVerify = data => {
  const userData = {
    id: data.id
  };
  return db.Users.update({
    _id: userData.id,
    action: { available: true }
  });
};

exports.passwordChange = async data => {
  const { id, oldPassword, newPassword, repeatPassword } = data;

  if (!oldPassword || !newPassword || !repeatPassword) {
    return {
      success: false,
      error: "Please, fill all the inputs"
    };
  }
  const user = await db.Users.getOneByID(id);
  if (md5(oldPassword) !== user.password) {
    return {
      success: false,
      error: "Old Password doesn't match"
    };
  }

  if (newPassword.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters"
    };
  }

  if (newPassword !== repeatPassword) {
    return {
      success: false,
      error: "Passwords doesn't match with each others"
    };
  }

  const userUpdate = await db.Users.update({
    _id: id,
    action: { password: md5(newPassword) }
  });

  if (userUpdate) {
    return {
      success: true,
      message: "password was changed"
    };
  }
  return {
    success: false,
    error: "Unknown error met"
  };
};
