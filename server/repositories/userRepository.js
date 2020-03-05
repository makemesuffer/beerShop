const mongoose = require("mongoose");

const Users = require("../model/Users");
const BaseRepository = require("./baseRepository");

const User = mongoose.model("Users");

class UserRepository extends BaseRepository {
  login(login, password) {
    return this.model.findOne({ login, password });
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
    return this.model.findOneAndUpdate(
      { _id: data.userId },
      { $push: { beerList: data.beerId } }
      // TODO:  super.update
    );
  }

  deleteBeer(data) {
    return this.model.findOneAndUpdate(
      { _id: data.userId },
      { $pull: { beerList: data.beerId } }
    );
  }
}

module.exports = new UserRepository(Users);
