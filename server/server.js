const express = require("express");
const passport = require("passport");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const socketIo = require("socket.io");

require("dotenv").config();

const setUpConnection = require("./inregration/dbLoader");

setUpConnection();

const router = require("./routes/router");
const cfg = require("./config.js");
const errorController = require("./controllers/errorController");
const passportCfg = require("./helpers/passport");

const app = express();

app.use(
  cors({
    origin: [cfg.client_Options.url, cfg.url]
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 50000
  })
);

app.use(passport.initialize());

passportCfg(passport);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", socket => {
  console.log("working");
  socket.on("message", message => {
    console.log(message);
    io.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected!");
  });
});

// app.use(io);

app.use(router);

app.use(errorController);

server.listen(cfg.EXPRESS_PORT, () => {
  console.log(`Express server running on port ${cfg.EXPRESS_PORT}.`);
});
