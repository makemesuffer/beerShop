const mongoose = require("mongoose");
const Users = require("../model/Users");

const User = mongoose.model("Users");

module.exports.login = (login, password) => {
  return Users.findOne({ login, password });
};

module.exports.create = data => {
  const {
    login,
    password,
    firstName,
    lastName,
    profilePicture,
    birthDate,
    available
  } = data;
  const user = new User({
    login,
    password,
    firstName,
    lastName,
    birthDate,
    createdAt: new Date(),
    profilePicture: profilePicture || null,
    available
  });
  const promise = user.save();
  console.log(promise, "working and called");
  return promise;
};
