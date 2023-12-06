const express = require("express");

const {
  AddtoCart,
  fetchCartItemById,
  updateCartItem,
  deleteCartItem,
} = require("../controller/CartControl");

const router = express.Router();

router
  .post("/", AddtoCart)
  .get("/", fetchCartItemById)
  .patch("/:id", updateCartItem)
  .delete("/:id", deleteCartItem);

exports.router = router;
