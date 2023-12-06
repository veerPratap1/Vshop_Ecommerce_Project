const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    products: { type: [Schema.Types.Mixed], requird: true },
    totalCost: { type: Number },
    quantity: { type: Number, default: 1 },
    address: { type: Schema.Types.Mixed },
    paymemtMode: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const virtual = OrderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model("Order", OrderSchema);
