const mongoose = require("mongoose");
// const user = require("./UserUtils");

module.exports.setUpConnection = () => {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  );
};

// module.exports.Users = user;
