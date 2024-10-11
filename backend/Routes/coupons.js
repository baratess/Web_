const express = require("express");
const router = express.Router();
const Coupon = require("../Models/Coupon.js");

// Coupon create
router.post("/", async (req, res) => {
  try {
    const { code } = req.body;

    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
      return res.status(400).json({ error: "This coupon is already exist" });
    }
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();

    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
  }
});

// Coupon read
router.get("/", async (req, res) => {
  try {
    const coupon = await Coupon.find();

    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
});

// Coupon read (single)
router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    try {
      const coupon = await Coupon.findById(couponId);
      res.status(200).json(coupon);
    } catch (error) {
      res.status(404).json({ error: "Coupon not found" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
});

// Coupon read (single by code)
router.get("/code/:couponCode", async (req, res) => {
  try {
    const couponCode = req.params.couponCode;

    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
});

// Coupon update
router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updates = req.body;

    const existingCoupon = await Coupon.findById(couponId);
    if (!existingCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
    });
    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
});

// Coupon delete
router.delete("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    res.status(200).json(`${couponId} has been deleted`);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
