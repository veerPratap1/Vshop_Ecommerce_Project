const express = require("express");
const {
  createCategory,
  fetchAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/CategoryControl");
const { upload } = require("../middleware/uploadImage");

const router = express.Router();

router
  .post("/", upload.single("label"), createCategory)
  .get("/", fetchAllCategory)
  .delete("/:id", deleteCategory)
  .patch("/:id", updateCategory);

exports.router = router;
