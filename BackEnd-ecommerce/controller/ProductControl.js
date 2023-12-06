const { Product } = require("../models/ProductModel");
const { User } = require("../models/UserModel");

exports.createProduct = async (req, res) => {
  try {
    if (req.files) {
      const newProduct = {
        ...req.body,
        images: [
          req.files.image1[0].path,
          req.files.image2[0].path,
          req.files.image3[0].path,
          req.files.image4[0].path,
        ],
        thumbnail: req.files.thumbnail[0].path,
      };
      const product = new Product(newProduct);
      const doc = await product.save();
      res.status(200).json(doc);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllProducts = async (req, res) => {
  try {
    let condition = {};

    if (!req.query.admin) {
      condition.deleted = { $ne: true };
    }

    if (req.query.title) {
      condition.title = { $regex: req.query.title, $options: "i" };
    }

    let products = Product.find(condition)
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .populate("colour")
      .populate("size");
    let totalProductQuery = Product.find(condition);

    if (req.query.category) {
      products = products.find({
        category: { $in: req.query.category.split(",") },
      });
      totalProductQuery = totalProductQuery.find({
        category: { $in: req.query.category.split(",") },
      });
    }
    if (req.query.subCategory) {
      products = products.find({
        subCategory: { $in: req.query.subCategory.split(",") },
      });
      totalProductQuery = totalProductQuery.find({
        subCategory: { $in: req.query.subCategory.split(",") },
      });
    }
    if (req.query.brand) {
      products = products.find({ brand: { $in: req.query.brand.split(",") } });
      totalProductQuery = totalProductQuery.find({
        brand: { $in: req.query.brand.split(",") },
      });
    }
    if (req.query._sort && req.query._order) {
      products = products.sort({ [req.query._sort]: req.query._order });
    }

    if (req.query._page && req.query._limit) {
      pageSize = req.query._limit;
      page = req.query._page;
      products = products.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const totalProducts = await totalProductQuery.count().exec();

    const docs = await products.exec();
    res.set({ "X-Total-Count": totalProducts });
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    const doc = await Product.findById({ _id: product.id })
      .populate("size")
      .populate("category")
      .populate("subCategory")
      .populate("colour")
      .populate("brand")
      .exec();

    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateProductThumbnail = async (req, res) => {
  const id = req.params.id;
  try {
    if (req.file) {
      const thumbnailpic = req.file.path;

      const product = await Product.findByIdAndUpdate(
        { _id: id },
        {
          thumbnail: thumbnailpic,
        },
        {
          new: true,
        }
      );
      const doc = await Product.findById({ _id: product.id })
        .populate("size")
        .populate("category")
        .populate("subCategory")
        .populate("colour")
        .populate("brand")
        .exec();

      res.status(200).json(doc);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateProductImagesArray = async (req, res) => {
  const { id, index } = req.params;

  try {
    if (req.file) {
      const ImagePath = req.file.path;

      const product = await Product.findById({ _id: id });

      if (index >= 0 || index <= product.images.length) {
        product.images[index] = ImagePath;
      }

      const newProduct = await product.save();

      const doc = await Product.findByIdAndUpdate(
        { _id: newProduct.id },
        newProduct,
        {
          new: true,
        }
      )

      const doc2 = await Product.findById({ _id: doc.id })
        .populate("size")
        .populate("category")
        .populate("subCategory")
        .populate("colour")
        .populate("brand")
        .exec();

      res.status(200).json(doc2);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.fetchProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById({ _id: id })
      .populate("size")
      .populate("category")
      .populate("subCategory")
      .populate("colour")
      .populate("brand");
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createProductReview = async (req, res) => {
  const { id } = req.user;

  const { rating, comment } = req.body;

  try {
    const user = await User.findById(id).exec();

    const product = await Product.findById(req.params.id);

    const review = {
      name: user.name,
      profileImg: user.ProfileImg,
      rating: +rating,
      comment: comment,
      user: user.id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    const doc = await product.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).send(error);
  }
};
