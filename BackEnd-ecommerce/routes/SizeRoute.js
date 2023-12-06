const express = require("express");
const {
  createSize,
  fetchAllSize,
  updateSize,
  deleteSize,
} = require("../controller/SizeControl");

const router = express.Router();

router
  .post("/", createSize)
  .get("/", fetchAllSize)
  .delete("/:id", deleteSize)
  .patch("/:id", updateSize);

exports.router = router;
