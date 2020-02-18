const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

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

app.use(router);

app.use(errorController);

app.listen(cfg.EXPRESS_PORT, () => {
  console.log(`Express server running on port ${cfg.EXPRESS_PORT}.`);
});
