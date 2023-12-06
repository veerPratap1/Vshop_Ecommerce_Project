const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  quantity: { type: Number },
  size:{type : Schema.Types.ObjectId, ref:"size"},
  colour:{type : Schema.Types.ObjectId, ref:"colour"},
},
{
  timestamps: true,
});

const virtual = CartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

CartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Cart = mongoose.model("Cart", CartSchema);
