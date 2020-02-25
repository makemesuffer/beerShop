const mongoose = require("mongoose");
const Users = require("../model/Users");

const User = mongoose.model("Users");

module.exports = class UserRepository {
  login(login, password) {
    return Users.findOne({ login, password });
  }

  create(data) {
    const user = new User({
      login: data.login,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      createdAt: new Date(),
      profilePicture: data.profilePicture || null,
      available: false
    });
    return user.save();
  }

  addBeer(data) {
    return Users.findOneAndUpdate(
      { _id: data.userId },
      { $push: { beerList: data.id } }
    );
  }

  deleteBeer(data) {
    return Users.findOneAndUpdate(
      { _id: data.userId },
      { $pull: { beerList: data.id } }
    );
  }
};
