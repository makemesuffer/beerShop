const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/sign", userController.registerUser);

router.post("/login", userController.loginUser);

module.exports = router;
