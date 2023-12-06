const mongoose = require("mongoose");

let { Schema } = mongoose;

let SizeSchema = new Schema(
  {
    value: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const virtual = SizeSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

SizeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.size = mongoose.model("size", SizeSchema);
