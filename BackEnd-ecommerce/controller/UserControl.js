const { User } = require("../models/UserModel");

exports.fetchLoginUserById = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id).exec();
    res.status(200).json({
      id: user.id,
      role: user.role,
      addresses: user.addresses,
      email: user.email,
      mobile: user.mobile,
      name: user.name,
      orders: user.orders,
      profileImg: user.ProfileImg,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.fetchAllUser = async (req, res) => {
  try {
    const user = await User.find();

    let data = [];

    for(let value of user){
      data.push({
        name: value.name,
        id: value.id,
        email: value.email
      })
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
