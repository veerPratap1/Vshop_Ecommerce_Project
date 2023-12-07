const { Brand } = require("../models/brandModel");

exports.createBrand = async (req, res) => {
  if (req.file) {
    const newBrand = { ...req.body, label: req.file.path };

    const brand = new Brand(newBrand);

    try {
      const doc = await brand.save();
      res.json(doc);
    } catch (error) {
      res.json(error);
    }
  }
};
exports.fetchAllBrand = async (req, res) => {
  try {
    const { value, _page, _limit } = req.query;

    const condition = {};

    let brand = Brand.find({});
    let totalbrand = Brand.find({});

    if (value && _page && _limit) {
      condition.value = { $regex: value, $options: "i" };
      const size = _limit;
      const Page = _page;

      brand = brand
        .find(condition)
        .skip(size * (Page - 1))
        .limit(size);

      totalbrand = totalbrand.find(condition).count();
    }
    if (req.query._limit) {
      const size = req.query._limit;
      brand = brand.find({}).limit(size);
    }
    if (req.query._limit && req.query._page) {
      const size = req.query._limit;
      const Page = req.query._page;

      brand = brand.skip(size * (Page - 1)).limit(size);
    }
    if (value) {
      condition.value = { $regex: value, $options: "i" };
      brand = brand.find(condition);
    }

    const doc = await brand.exec();
    const totalBrand = await totalbrand.count().exec();

    res.set({ "X-Total-Count": totalBrand });
    res.status(200).json(doc);
  } catch (error) {
    res.json(error);
  }
};
exports.updateBrand = async (req, res) => {
  const { id } = req.params;
  const Brands = await Brand.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  try {
    res.json(Brands);
  } catch (error) {
    res.json(error);
  }
};
exports.deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Brand.findByIdAndDelete({ _id: id });
    res.json(doc);
  } catch (error) {
    res.sendStatus(401).json(error);
  }
};
