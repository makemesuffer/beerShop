const mongoose = require("mongoose");

module.exports = class baseRepository {
  update(model, object) {
    return model.findOneAndUpdate({ _id: object._id }, { $set: object.action });
  }

  getOneByID(model, id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return model.findOne({ _id: id });
    }
  }

  find(model, param, value) {
    return model.findOne({ [param]: value });
  }
};
