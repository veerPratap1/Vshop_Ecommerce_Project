const { message } = require("../models/MessagesModel");

exports.createMessage = async (req, res) => {
  const messages = new message(req.body);
  try {
    const doc = await messages.save();
    res.json(doc);
  } catch (error) {
    res.json(error);
  }
};
exports.fetchAllMessage = async (req, res) => {
  try {
    const { name } = req.query;

    const condition = {};

    if (name) {
      condition.name = { $regex: name, $options: "i" };
      const doc = await message.find(condition);

      res.json(doc);
    } else {
      const messages = await message.find({});

      res.json(messages);
    }
  } catch (error) {
    res.json(error);
  }
};
