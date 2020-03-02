const router = require("express").Router();

const VerifyController = require("../controllers/verifyController");

const verifyController = new VerifyController();

// TODO: переделай все эти посты на путы/делиты при необходимости

router.get("/account/verify/:id", verifyController.verifyUser);

router.post("/users/:id/change-password", verifyController.changePassword);

router.post("/password", verifyController.forgotPassword);

router.post("/confirm", verifyController.checkCode);

router.post("/pass", verifyController.replacePassword);

module.exports = router;
