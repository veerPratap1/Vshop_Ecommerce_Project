const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubCategorySchema = new Schema(
  {
    value: {
      type: String,
      required: [true, "value is required"],
      unique: true,
    },
    label: { type: String, required: [true, "value is required"] },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "value is required"],
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const virtual = SubCategorySchema.virtual("id");
virtual.get(function () {
  return this._id;
});

SubCategorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.SubCategory = mongoose.model("SubCategory", SubCategorySchema);
