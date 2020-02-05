const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const cfg = require("./server/config.js");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(require("./server/routes/users"));
app.use(require("./server/routes/verify"));

// Budet last vsegda

app.use(require("./server/controllers/errorController"));

app.listen(cfg.EXPRESS_PORT, () => {
  console.log(`Express server running on port ${cfg.EXPRESS_PORT}.`);
});
