const { signUp, login } = require("../Controller/authController");

const router = require("express").Router();

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;
