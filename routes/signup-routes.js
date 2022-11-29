const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");

router.get("/signup", signupController.signup);

router.post("/verify", signupController.signupValidation);

module.exports = router;
