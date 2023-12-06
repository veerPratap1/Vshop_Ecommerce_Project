const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  updateProduct,
  fetchProductById,
  createProductReview,
  updateProductThumbnail,
  updateProductImagesArray,
} = require("../controller/ProductControl");
const { upload } = require("../middleware/uploadImage");

const router = express.Router();

router
  .post(
    "/",
    upload.fields([
      {
        name: "thumbnail",
        maxCount: 1,
      },
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
    ]),
    createProduct
  )
  .post("/:id/reviews", createProductReview)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct)
  .patch("/thumbnail/:id", upload.single("thumbnail"), updateProductThumbnail)
  .patch("/:id/image/:index", upload.single("image"), updateProductImagesArray)

exports.router = router;
