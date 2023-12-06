const mongoose = require("mongoose");

let { Schema } = mongoose;

let colorSchema = new Schema(
  {
    value: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const virtual = colorSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

colorSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.colour = mongoose.model("colour", colorSchema);
