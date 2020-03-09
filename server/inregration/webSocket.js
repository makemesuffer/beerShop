const brewRepository = require("../repositories/brewRepository");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("add-message", async id => {
      const brew = await brewRepository
        .find("_id", id)
        .populate("author", "firstName");
      io.sockets.emit("get_data", brew);
    });
  });
};
