const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    profileImg: { type: String, required: [true, "Images are requried"] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "descrioption is required"] },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "wrong min price"],
    },
    discountPercentage: {
      type: Number,
      min: [0, "wrong min Percentage"],
      max: [99, "wrong max Percentage"],
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      min: [0, "wrong min rating"],
      max: [5, "wrong max rating"],
      default: 0,
    },
    stock: {
      type: Number,
      min: [0, "wrong min stock"],
      default: 0,
    },
    brand: {
      type: Schema.ObjectId,
      ref: "Brand",
      required: [true, "Category is required"],
    },
    thumbnail: { type: String, required: [true, "Thumbnail is required"] },
    images: { type: [String], required: [true, "Images are requried"] },
    deleted: { type: Boolean, default: false },
    colour: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "colour", // The model to which these ObjectIds belong
      },
      {
        unique: true,
      },
    ],
    size: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "size",
      },
      {
        unique: true,
      },
    ],
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    subCategory: {
      type: Schema.ObjectId,
      ref: "SubCategory",
      required: [true, "SubCategory is required"],
    },
  },
  {
    timestamps: true,
  }
);

const virtual = ProductSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

ProductSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Product = mongoose.model("Product", ProductSchema);
