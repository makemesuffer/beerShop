const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/sign", userController.registerUser);

module.exports = router;
