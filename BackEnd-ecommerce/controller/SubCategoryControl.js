const { SubCategory } = require("../models/SubCategoryModel");

exports.createSubCategory = async (req, res) => {
  if (req.file) {
    const newSubCategory = { ...req.body, label: req.file.path };

    const subCategories = new SubCategory(newSubCategory);

    try {
      const doc = await subCategories.save();
      res.json(doc);
    } catch (error) {
      res.json(error);
    }
  }
};
exports.fetchAllSubCategory = async (req, res) => {
  try {
    const { value, _page, _limit } = req.query;

    const condition = {};

    let subCategory = SubCategory.find({});
    let totalSubCategory = SubCategory.find({});

    if (value && _page && _limit) {
      condition.value = { $regex: value, $options: "i" };
      const size = _limit;
      const Page = _page;

      subCategory = subCategory
        .find(condition)
        .skip(size * (Page - 1))
        .limit(size)
        .populate("category");

      totalSubCategory = totalSubCategory.find(condition).count();
    } else if (req.query._limit) {
      const size = req.query._limit;
      subCategory = subCategory.find({}).limit(size).populate("category");
    } else if (req.query._limit && req.query._page) {
      const size = req.query._limit;
      const Page = req.query._page;

      subCategory = subCategory
        .skip(size * (Page - 1))
        .limit(size)
        .populate("category");
    }else if(value){
      condition.value = { $regex: value, $options: "i" };

      subCategory = subCategory.find(condition).populate("category")

    } else {
      subCategory = subCategory.find({}).populate("category");
    }

    const doc = await subCategory.find({}).exec();
    const totalSubcat = await totalSubCategory.count().exec();

    res.set({ "X-Total-Count": totalSubcat });
    res.status(200).json(doc);
  } catch (error) {
    res.json(error);
  }
};
exports.updateSubCategory = async (req, res) => {
  const { id } = req.params;
  const subcategories = await SubCategory.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  try {
    res.json(subcategories);
  } catch (error) {
    res.json(error);
  }
};

exports.deleteSubCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await SubCategory.findByIdAndDelete({ _id: id });
    res.json(doc);
  } catch (error) {
    res.sendStatus(401).json(error);
  }
};
