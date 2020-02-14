const router = require("express").Router();

const userRouter = require("./users");
const verifyRouter = require("./verify");
const beerRouter = require("./beers");
const imageRouter = require("./image");

router.use(userRouter);
router.use(verifyRouter);
router.use(beerRouter);
router.use(imageRouter);

module.exports = router;
