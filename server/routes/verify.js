const router = require("express").Router();

const VerifyController = require("../controllers/verifyController");

const verifyController = new VerifyController();

router.get("/accounts/verify/:id", verifyController.verifyUser);

router.put("/users/:id/password", verifyController.changePassword);

router.post("/password", verifyController.forgotPassword);

router.get("/confirmation/:code", verifyController.checkCode);

router.put("/password/:id", verifyController.replacePassword);

module.exports = router;
