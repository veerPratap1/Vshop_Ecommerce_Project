const express = require("express");

const {
  createBrand,
  fetchAllBrand,
  deleteBrand,
  updateBrand,
} = require("../controller/BrandControl");
const { upload } = require("../middleware/uploadImage");

const router = express.Router();

router
  .post("/",upload.single("label"), createBrand)
  .get("/", fetchAllBrand)
  .delete("/:id", deleteBrand)
  .patch("/:id", updateBrand);

exports.router = router;
