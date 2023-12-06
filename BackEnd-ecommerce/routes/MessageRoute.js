const express = require("express");
const { createMessage, fetchAllMessage } = require("../controller/MessageControl");

const router = express.Router();

router
  .post("/", createMessage)
  .get("/", fetchAllMessage)

exports.router = router;
