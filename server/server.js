const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const http = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const enableWs = require("express-ws");

require("dotenv").config();

mongoose.connect(
  `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

require("./model/Users");
require("./model/Brews");

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

enableWs(app);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  ws.on("message", message => {
    ws.send(message);
  });
});

app.use(router);

app.use(errorController);

server.listen(cfg.EXPRESS_PORT, () => {
  console.log(`Express server running on port ${cfg.EXPRESS_PORT}.`);
});

// TODO: переписать бейс в абстрактный класс, заэкстендить его
// TODO: создать (имя) слой и запихнуть туда клауды и функцию подключения дб
