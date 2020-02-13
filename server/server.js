const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const router = require("./routes/router");
const cfg = require("./config.js");
const errorController = require("./controllers/errorController");

const app = express();

app.use(
  cors({
    origin: [cfg.client_Options.url, cfg.url]
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(router);

app.use(errorController);

app.listen(cfg.EXPRESS_PORT, () => {
  console.log(`Express server running on port ${cfg.EXPRESS_PORT}.`);
});

// TODO: восстановление по мылу
// TODO: аплоад картинок
