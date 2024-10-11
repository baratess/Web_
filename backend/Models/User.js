const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    img: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    isLogin: { type: String, default: "no", enum: ["no", "yes"] },
    address: { type: String, default: "" },
    phonenumber: { type: Number, default: "" },
    // verificationToken: { type: String },
    // isVerified: { type: Boolean, default: false },
    currentOrders: [OrderSchema],
    pastOrders: [OrderSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
