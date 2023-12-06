const { Category } = require("../models/CategoryModel");
const { Product } = require("../models/ProductModel");
const { SubCategory } = require("../models/SubCategoryModel");

exports.createCategory = async (req, res) => {
  if (req.file) {

    const newCategory = { ...req.body, label: req.file.path };

    const categories = new Category(newCategory);
    try {
      const doc = await categories.save();
      res.json(doc);
    } catch (error) {
      res.json(error);
    }
  }
};

exports.fetchAllCategory = async (req, res) => {
  try {
    const { value, _page, _limit } = req.query;

    const condition = {};

    let category = Category.find({});
    let totalCategory = Category.find({});

    if (value && _page && _limit) {
      condition.value = { $regex: value, $options: "i" };
      const size = _limit;
      const Page = _page;
      category = category
        .find(condition)
        .skip(size * (Page - 1))
        .limit(size);
      totalCategory = totalCategory.find(condition).count();
    } else if (req.query._limit) {
      const size = req.query._limit;

      category = category.find({}).limit(size);
    } else if (req.query._limit && req.query._page) {
      const size = req.query._limit;

      const page = req.query._page;

      category = category.skip(size * (page - 1)).limit(size);
    } else if (value) {
      condition.value = { $regex: value, $options: "i" };
      category = category.find(condition);
    }
    const categories = await category.find({}).exec();
    const TotalCat = await totalCategory.count().exec();

    res.set({ "X-Total-Count": TotalCat });
    res.status(200).json(categories);
  } catch (error) {
    res.json(error);
  }
};
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const categories = await Category.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  try {
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
};
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Category.findByIdAndDelete({ _id: id });

    await SubCategory.deleteMany({ category: doc.id });

    res.json(doc);
  } catch (error) {
    res.sendStatus(401).json(error);
  }
};
