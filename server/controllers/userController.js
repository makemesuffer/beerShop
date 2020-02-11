const md5 = require("md5");
const moment = require("moment");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

const config = require("../config");
const mailer = require("../helpers/mailer");
const wrapAsync = require("../helpers/asyncErrorHandler");
const db = require("../loaders/db");

exports.registerUser = wrapAsync(async (req, res) => {
  const { login, password, firstName, lastName, birthDate } = req.body;

  if (!login || !password || !firstName || !lastName || !birthDate) {
    return res.json({
      success: false,
      error: "Please fill all the inputs"
    });
  }

  if (password.length < 8) {
    return res.json({
      success: false,
      error: "Password must be at least 8 characters"
    });
  }

  if (moment().diff(birthDate, "years") < 18) {
    return res.json({
      success: false,
      error: "maloy kakoe pivo tebe? S'ebal otsuda"
    });
  }

  if (!validator.validate(login)) {
    return res.json({
      success: false,
      error: "login incorrect, need email format"
    });
  }

  if (await db.Users.findEmail(login)) {
    return res.json({
      success: false,
      error: "email is already taken"
    });
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
    const link = `http://localhost:1337/account/verify/${result._id}`;
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

// TODO: login tol'ko po available

exports.loginUser = wrapAsync(async (req, res) => {
  if (!req.body.password || !req.body.login) {
    res.json({
      success: false,
      error: "Password and login required"
    });
    return;
  }
  const userData = {
    login: req.body.login,
    password: md5(req.body.password)
  };
  const result = await db.Users.login(userData.login, userData.password);
  if (result) {
    const ans = {
      success: true,
      user: {
        id: result._id,
        login: result.login,
        firstName: result.firstName,
        lastName: result.lastName,
        birthDate: result.birthDate,
        profilePicture: result.profilePicture,
        available: result.available,
        beerList: result.beerList
      }
    };
    if (result.available) {
      ans.accessTOKEN = await jwt.sign({ id: result._id }, config.jwtSECRET, {
        expiresIn: "14 days"
      });
    }
    res.status(200).send(ans);
  } else {
    res.json({
      success: false,
      error: "Login or password is incorrect"
    });
  }
});

exports.findUser = wrapAsync(async (req, res) => {
  const { id } = req.params;
  // вот тут вебтокен юзни а то узнают пароль и все по судам таскаться будешь
  const result = await db.Users.getOneByID(id);
  if (result) {
    const response = {
      id: result._id,
      login: result.login,
      firstName: result.firstName,
      lastName: result.lastName,
      birthDate: result.birthDate,
      createdAt: result.createdAt,
      profilePicture: result.profilePicture,
      beerList: result.beerList
    };
    res.status(200).send(response);
  } else {
    res.json({
      success: false,
      error: "There is no such user"
    });
  }
});
