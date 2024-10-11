const mongoose = require("mongoose");

const CouponSchema = mongoose.Schema(
  {
    code: { type: String, required: true },
    discount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", CouponSchema);

module.exports = Coupon;
