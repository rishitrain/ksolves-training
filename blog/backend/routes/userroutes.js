const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.getUsers);
router.post("/login", UserController.userLogin);
router.post("/signup", UserController.userSignup);

module.exports = router;
