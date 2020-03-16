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

  push(object) {
    return this.model.findOneAndUpdate(
      { _id: object._id },
      { $push: object.action }
    );
  }

  pull(object) {
    return this.model.findOneAndUpdate(
      { _id: object._id },
      { $pull: object.action }
    );
  }

  find(param, value) {
    return this.model.findOne({ [param]: value });
  }

  findAllByValue(param, value) {
    return this.model.find({ [param]: value });
  }

  findAll() {
    return this.model.find({});
  }
}

module.exports = BaseRepository;
