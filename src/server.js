const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const cfg = require("./server/config.js");

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

app.use(require("./server/routes/users"));
app.use(require("./server/routes/verify"));

// TODO: уровень репозиториев, убрать ютилс. Классы переписать(потом). Бейс репозиторий сделать, бейс сервис и тд. Редирект на клиенте. Сделать обработчик статусов

app.use(require("./server/controllers/errorController"));

app.listen(cfg.EXPRESS_PORT, () => {
  console.log(`Express server running on port ${cfg.EXPRESS_PORT}.`);
});
