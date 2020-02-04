const mongoose = require("mongoose");
const Users = require("../model/Users");

const User = mongoose.model("Users");

module.exports.login = (login, password) => {
  return Users.findOne({ login, password });
};

module.exports.create = data => {
  const { login, password, name, email, profilePicture, birthDate } = data;
  const user = new User({
    login,
    password,
    firstName: name.firstName || null,
    lastName: name.lastName || null,
    birthDate,
    email,
    createdAt: new Date(),
    profilePicture: profilePicture || null
  });
  const promise = user.save();
  console.log(promise);
  return promise;
};
