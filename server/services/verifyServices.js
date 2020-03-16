const md5 = require("md5");

const validator = require("email-validator");
const userRepository = require("../repositories/userRepository");
const mailer = require("../helpers/mailer");

module.exports = class VerifyServices {
  userVerify(data) {
    const userData = {
      id: data.id
    };
    return userRepository.update({
      _id: userData.id,
      action: { available: true }
    });
  }

  async passwordChange(data) {
    const { id, oldPassword, newPassword, repeatPassword } = data;

    if (!oldPassword || !newPassword || !repeatPassword) {
      return {
        success: false,
        error: "Please, fill all the inputs",
        status: 400
      };
    }
    const user = await userRepository.find("_id", id);
    if (md5(oldPassword) !== user.password) {
      return {
        success: false,
        error: "Old Password doesn't match",
        status: 400
      };
    }

    if (newPassword.length < 8) {
      return {
        success: false,
        error: "Password must be at least 8 characters",
        status: 400
      };
    }

    if (newPassword !== repeatPassword) {
      return {
        success: false,
        error: "Passwords doesn't match with each others",
        status: 400
      };
    }

    const userUpdate = await userRepository.update({
      _id: id,
      action: { password: md5(newPassword) }
    });

    if (userUpdate) {
      return {
        success: true,
        message: "password was changed",
        status: 200
      };
    }
    return {
      success: false,
      error: "Unknown error met",
      status: 400
    };
  }

  async passwordForgot(data) {
    const { email } = data;

    if (!validator.validate(email)) {
      return {
        success: false,
        error: "Need email format",
        status: 400
      };
    }

    const result = await userRepository.find("login", email);

    if (result) {
      const generateCode = Math.random()
        .toString(36)
        .substring(2, 7);

      await userRepository.update({
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
  }

  async codeCheck(data) {
    const { code } = data;
    const result = await userRepository.find("resetCode", code);
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
  }

  async passwordReplace(data) {
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

    const userUpdate = await userRepository.update({
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
  }
};
