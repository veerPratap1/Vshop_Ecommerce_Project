const express = require("express");
const {
  create_colour,
  fetchAll_colour,
  update_colour,
  delete_colour,
} = require("../controller/ColorControl");

const router = express.Router();

router
  .post("/", create_colour)
  .get("/", fetchAll_colour)
  .delete("/:id", delete_colour)
  .patch("/:id", update_colour);

exports.router = router;
