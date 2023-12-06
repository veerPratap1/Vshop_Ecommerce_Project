const express = require("express");
const {
  fetchLoginUserById,
  updateUser,
  fetchAllUser,
} = require("../controller/UserControl");

const router = express.Router();

router
  .get("/own", fetchLoginUserById)
  .get("/all", fetchAllUser)
  .patch("/:id", updateUser);

exports.router = router;
