const express = require("express");
const {
  createOrder,
  fetchLoginUserOrders,
  fetchAllOrders,
  updateOrder,
  fetchOrderById,
} = require("../controller/OrderControl");

const router = express.Router();

router
  .post("/", createOrder)
  .get("/user/own", fetchLoginUserOrders)
  .get("/", fetchAllOrders)
  .get("/:id", fetchOrderById)
  .patch("/:id", updateOrder);

exports.router = router;
