const router = require("express").Router();

const verifyController = require("../controllers/verifyController");

router.get("/account/Verify/:id", verifyController.verifyUser);

router.post("/users/:id/change-password", verifyController.changePassword);

module.exports = router;
