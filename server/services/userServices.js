const md5 = require("md5");
const moment = require("moment");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

const db = require("../loaders/db");
const config = require("../config");
const mailer = require("../helpers/mailer");

exports.userRegister = async data => {
  const { login, password, firstName, lastName, birthDate } = data;

  if (!login || !password || !firstName || !lastName || !birthDate) {
    return {
      success: false,
      error: "Please fill all the inputs",
      status: 400
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters",
      status: 400
    };
  }

  if (moment().diff(birthDate, "years") < 18) {
    return {
      success: false,
      error: "You have to be older than 18 to register",
      status: 400
    };
  }

  if (!validator.validate(login)) {
    return {
      success: false,
      error: "Login incorrect, need email format",
      status: 400
    };
  }

  if (await db.Users.findEmail(login)) {
    return {
      success: false,
      error: "email is already taken",
      status: 400
    };
  }

  const userData = {
    login,
    password: md5(password),
    birthDate,
    firstName,
    lastName
  };
  const result = await db.Users.create(userData);
  if (result.login) {
    const link = `${config.url}/account/verify/${result._id}`;
    await mailer.send({
      source: "email-verification",
      login: userData.login,
      link
    });
    return {
      success: true,
      user: {
        login: result.login,
        available: result.available
      },
      status: 200
    };
  }
};

exports.userLogin = async data => {
  if (!data.password || !data.login) {
    return {
      success: false,
      error: "Password and login required"
    };
  }
  const userData = {
    login: data.login,
    password: md5(data.password)
  };
  const result = await db.Users.login(userData.login, userData.password);
  if (result && result.available === true) {
    const user = {
      id: result._id,
      login: result.login,
      firstName: result.firstName,
      lastName: result.lastName,
      birthDate: result.birthDate,
      profilePicture: result.profilePicture,
      beerList: result.beerList
    };
    const ans = {
      success: true
    };

    ans.accessTOKEN = await jwt.sign(user, config.secretOrKey, {
      expiresIn: "14 days"
    });

    return ans;
  }
  return {
    success: false,
    error: "Login or password is incorrect"
  };
};

exports.userFind = async data => {
  const { id } = data;
  const result = await db.Users.getOneByID(id);
  if (result) {
    return {
      id: result._id,
      login: result.login,
      firstName: result.firstName,
      lastName: result.lastName,
      birthDate: result.birthDate,
      createdAt: result.createdAt,
      profilePicture: result.profilePicture,
      beerList: result.beerList
    };
  }
  return {
    success: false,
    error: "There is no such user"
  };
};
