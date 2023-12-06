const { size } = require("../models/SizeModel");

exports.createSize = async (req, res) => {
  const Sizes = new size(req.body);
  try {
    const doc = await Sizes.save();
    res.json(doc);
  } catch (error) {
    res.json(error);
  }
};
exports.fetchAllSize = async (req, res) => {
  try {
    const { value } = req.query;

    const condition = {};

    if (value) {
      condition.value = { $regex: value, $options: "i" };
      const doc = await size.find(condition);

      res.json(doc);
    } else {
      const Sizes = await size.find({});

      res.json(Sizes);
    }
  } catch (error) {
    res.json(error);
  }
};
exports.updateSize = async (req, res) => {
  const { id } = req.params;
  const Sizes = await size.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  try {
    res.json(Sizes);
  } catch (error) {
    res.json(error);
  }
};
exports.deleteSize = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await size.findByIdAndDelete({ _id: id });
    res.json(doc);
  } catch (error) {
    res.sendStatus(401).json(error);
  }
};
