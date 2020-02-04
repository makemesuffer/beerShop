const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

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

app.listen(cfg.EXPRESS_PORT, () => {
  console.log(`Express server running on port ${cfg.EXPRESS_PORT}.`);
});
