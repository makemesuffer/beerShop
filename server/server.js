const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const cfg = require("./config.js");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:1337"]
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(require("./routes/users"));
app.use(require("./routes/verify"));
app.use(require("./routes/image"));
app.use(require("./routes/beers"));

app.use(require("./controllers/errorController"));

app.listen(cfg.EXPRESS_PORT, () => {
  console.log(`Express server running on port ${cfg.EXPRESS_PORT}.`);
});
