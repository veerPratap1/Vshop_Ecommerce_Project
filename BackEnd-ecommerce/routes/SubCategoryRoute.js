const express = require("express");

const {
  createSubCategory,
  fetchAllSubCategory,
  deleteSubCategory,
  updateSubCategory,
} = require("../controller/SubCategoryControl");
const { upload } = require("../middleware/uploadImage");

const router = express.Router();

router
  .post("/", upload.single("label"), createSubCategory)
  .get("/", fetchAllSubCategory)
  .delete("/:id", deleteSubCategory)
  .patch("/:id", updateSubCategory);

exports.router = router;
