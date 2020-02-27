const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
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

app.ws("/echo", ws => {
  ws.on("message", data => {
    ws.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on("close", () => {
    console.log("WebSocket was closed");
  });
});

app.use(router);

app.use(errorController);

app.listen(cfg.EXPRESS_PORT, () => {
  console.log(`Express server running on port ${cfg.EXPRESS_PORT}.`);
});

/*

 */
