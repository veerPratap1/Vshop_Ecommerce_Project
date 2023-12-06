const mongoose = require("mongoose");

let { Schema } = mongoose;

let MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const virtual = MessageSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

MessageSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.message = mongoose.model("message", MessageSchema);
