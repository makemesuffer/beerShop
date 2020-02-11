const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const cfg = require("./config.js");
const userRouter = require("./routes/users");
const verifyRouter = require("./routes/verify");
const beerRouter = require("./routes/beers");
const errorController = require("./controllers/errorController");

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

app.use(userRouter);
app.use(verifyRouter);
app.use(beerRouter);

app.use(errorController);

app.listen(cfg.EXPRESS_PORT, () => {
  console.log(`Express server running on port ${cfg.EXPRESS_PORT}.`);
});
