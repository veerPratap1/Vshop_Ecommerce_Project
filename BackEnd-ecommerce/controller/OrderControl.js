const { Order } = require("../models/OrderModel");
const { Product } = require("../models/ProductModel");

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);

  for (let values of order.products) {
    let product = await Product.findById({ _id: values.product.id });
    product.$inc("stock", -1 * values.quantity);

    await product.save();
  }

  try {
    const doc = await order.save();
    res.json(doc);
  } catch (error) {
    res.json(error);
  }
};

exports.fetchLoginUserOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const order = await Order.find({ user: id }).exec();
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};

exports.fetchAllOrders = async (req, res) => {
  let order = Order.find({});
  let TotalOrderQuery = Order.find({});
  try {
    if (req.query._sort && req.query._order) {
      order = order.sort({ [req.query._sort]: req.query._order });
    }
    if (req.query._page && req.query._limit) {
      pageLimit = req.query._limit;
      page = req.query._page;
      order = order.skip(pageLimit * (page - 1)).limit(pageLimit);
    }
    const totalOrders = await TotalOrderQuery.count().exec();
    const doc = await order.exec();
    res.set({ "X-Total-Count": totalOrders });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.fetchOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById({ _id: id }).populate("user");

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};
