const { Cart } = require("../models/CartModel");

exports.AddtoCart = async (req, res) => {
  const { id } = req.user;
  const item = new Cart({ ...req.body, user: id });
  try {
    const doc = await item.save();
    const result = await doc.populate("product");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchCartItemById = async (req, res) => {
  const { id } = req.user;
  try {
    const cartItem = await Cart.find({ user: id })
      .populate("product")
      .populate("size")
      .populate("colour")
      .exec();
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.updateCartItem = async (req, res) => {
  const id = req.params.id;
  try {
    const cart = await Cart.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    }).populate("product");
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.deleteCartItem = async (req, res) => {
  const id = req.params.id;
  try {
    const item = await Cart.findByIdAndDelete({ _id: id });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
