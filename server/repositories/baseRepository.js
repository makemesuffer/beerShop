const mongoose = require("mongoose");

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  update(object) {
    return this.model.findOneAndUpdate(
      { _id: object._id },
      { $set: object.action }
    );
  }

  getOneByID(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.model.findOne({ _id: id });
    }
  }

  find(param, value) {
    return this.model.findOne({ [param]: value });
  }

  findAll() {
    return this.model.find({});
  }
}

module.exports = BaseRepository;
