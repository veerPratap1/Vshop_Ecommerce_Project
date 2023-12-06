const { colour } = require("../models/ColourModel");

exports.create_colour = async (req, res) => {
  const colours = new colour(req.body);
  try {
    const doc = await colours.save();
    res.json(doc);
  } catch (error) {
    res.json(error);
  }
};
exports.fetchAll_colour = async (req, res) => {
  try {
    const { value } = req.query;

    const condition = {};

    if (value) {
      condition.value = { $regex: value, $options: "i" };
      const doc = await colour.find(condition);

      res.json(doc);
    } else {
      const colours = await colour.find({});

      res.json(colours);
    }
  } catch (error) {
    res.json(error);
  }
};
exports.update_colour = async (req, res) => {
  const { id } = req.params;
  const colours = await colour.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  try {
    res.json(colours);
  } catch (error) {
    res.json(error);
  }
};
exports.delete_colour = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await colour.findByIdAndDelete({ _id: id });
    res.json(doc);
  } catch (error) {
    res.sendStatus(401).json(error);
  }
};
