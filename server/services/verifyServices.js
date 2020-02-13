const md5 = require("md5");

const validator = require("email-validator");
const db = require("../loaders/db");
const mailer = require("../helpers/mailer");

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

exports.passwordForgot = async data => {
  const { email } = data;

  if (!validator.validate(email)) {
    return {
      success: false,
      error: "Need email format",
      status: 400
    };
  }

  const result = await db.Users.findEmail(email);

  if (result) {
    const generateCode = Math.random()
      .toString(36)
      .substring(2, 7);

    await db.Users.update({
      _id: result._id,
      action: { resetCode: generateCode }
    });

    await mailer.send({
      source: "password-reset",
      login: email,
      code: generateCode
    });
    return {
      success: true,
      message: "mail was send",
      status: 200
    };
  }
  return {
    success: false,
    error: "there is no such email in our db",
    status: 400
  };
};

exports.codeCheck = async data => {
  const { code } = data;
  const result = await db.Users.findCode(code);
  if (result) {
    return {
      success: true,
      message: "code matches each other",
      id: result._id,
      status: 200
    };
  }
  return {
    success: false,
    error: "codes don't match with each others",
    status: 400
  };
};

exports.passwordReplace = async data => {
  const { id, newPassword, repeatPassword } = data;

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
