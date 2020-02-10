const router = require("express").Router();

const verifyController = require("../controllers/verifyController");

router.get("/account/Verify/:id", verifyController.verifyUser);

module.exports = router;
