const router = require("express").Router();

const verifyController = require("../controllers/verifyController");

router.get("/account/verify/:id", verifyController.verifyUser);

module.exports = router;
