const express = require("express");
const {
  createUser,
  checkLoginUser,
  LoginOutUser,
  checkUser,
  resetPasswordRequest,
  resetPassword,
} = require("../controller/AuthControl");
const passport = require("passport");
const { upload } = require("../middleware/uploadImage");

const router = express.Router();

router
  .post("/signUp", upload.single("profileImg"), createUser)
  .post("/login", passport.authenticate("local"), checkLoginUser)
  .get("/logout",LoginOutUser)
  .get("/check", passport.authenticate("jwt"), checkUser)
  .post("/reset-password-request", resetPasswordRequest)
  .post("/reset-password", resetPassword);

exports.router = router;
