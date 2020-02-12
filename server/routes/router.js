const router = require("express").Router();

const userRouter = require("./users");
const verifyRouter = require("./verify");
const beerRouter = require("./beers");

router.use(userRouter);
router.use(verifyRouter);
router.use(beerRouter);

module.exports = router;
