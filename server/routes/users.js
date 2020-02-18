const router = require("express").Router();

const UserController = require("../controllers/userController");

const userController = new UserController();

router.post("/sign", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/users/:id", userController.findUser);

module.exports = router;
