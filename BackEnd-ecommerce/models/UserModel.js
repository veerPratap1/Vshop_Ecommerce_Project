const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: [true, "Email is requided"] },
    password: { type: Buffer, required: [true, "Password is requided"] },
    role: { type: String, required: true, default: "user" },
    addresses: { type: [Schema.Types.Mixed] },
    name: { type: String, required : true },
    mobile: { type: String, required : true },
    orders: { type: [Schema.Types.Mixed] },
    ProfileImg: { type: String },
    salt: Buffer,
    resetPasswordToken: { type: String, default:''},
  },
  {
    timestamps: true,
  }
);

const virtual = UserSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.User = mongoose.model("User", UserSchema);
